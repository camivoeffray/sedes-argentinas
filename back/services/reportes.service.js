import { MongoClient, ObjectId } from "mongodb"
import * as sedesService from "./sedes.service.js"

const MONGO_URI = process.env.MONGO_URI
const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function guardarReporte(datos, email) {
    const usuario = await db.collection("usuarios").findOne({ email })
    if (!usuario) {
        return null
    }
    if (!ObjectId.isValid(datos.sedeId)) {
        return null
    }
    const sede = await sedesService.getSedeById(datos.sedeId)
    if (!sede || sede.eliminado === true) {
        return null
    }
    const pais = await db.collection("paises").findOne({
        _id: sede.paisInfo._id
    })
    if (!pais || pais.eliminado === true) {
        return null
    }
    const reporte = {
        usuarioId: usuario._id,
        sedeId: sede._id,
        campo: datos.campo,
        descripcion: datos.descripcion,
        valorPropuesto: datos.valorPropuesto,
        estado: "pendiente",
        fecha: new Date()
    }
    await db.collection("reportes").insertOne(reporte)

    return reporte
}

export async function getReportes() {
    const reportes = await db.collection("reportes")
        .find({ eliminado: { $ne: true } })
        .toArray()
    for (const reporte of reportes) {
        const sede = await db.collection("sedes").findOne({
            _id: reporte.sedeId
        })
        const usuario = await db.collection("usuarios").findOne({
            _id: reporte.usuarioId
        })

        reporte.usuarioNombre = usuario?.username || "Usuario no disponible"
        reporte.sedeNombre = sede?.nombre || "Sede no disponible"
    }

    return reportes
}

export async function getReportesByUsuario(email) {
    const usuario = await db.collection("usuarios").findOne({ email })
    if (!usuario) {
        return null
    }
    const reportes = await db.collection("reportes").find({
        usuarioId: usuario._id,
        eliminado: { $ne: true }
    }).toArray()
    for (const reporte of reportes) {
        const sede = await db.collection("sedes").findOne({
            _id: reporte.sedeId
        })

        reporte.sedeNombre = sede?.nombre || "Sede no disponible"
    }

    return reportes
}

export async function editarReporte(id, datos, email) {
    if (!ObjectId.isValid(id)) {
        return null
    }
    const usuario = await db.collection("usuarios").findOne({ email })
    if (!usuario) {
        return null
    }
    const reporte = await db.collection("reportes").findOne({
        _id: new ObjectId(id),
        usuarioId: usuario._id,
        eliminado: { $ne: true },
        estado: "pendiente"
    })
    if (!reporte) {
        return null
    }
    await db.collection("reportes").updateOne(
        { _id: reporte._id },
        {
            $set: {
                campo: datos.campo,
                descripcion: datos.descripcion,
                valorPropuesto: datos.valorPropuesto
            }
        }
    )
    return await db.collection("reportes").findOne({
        _id: reporte._id
    })
}

export async function eliminarReporte(id, email) {
    if (!ObjectId.isValid(id)) {
        return null
    }
    const usuario = await db.collection("usuarios").findOne({ email })
    if (!usuario) {
        return null
    }
    const reporte = await db.collection("reportes").findOne({
        _id: new ObjectId(id),
        usuarioId: usuario._id,
        eliminado: { $ne: true },
    })
    if (!reporte) {
        return null
    }
    await db.collection("reportes").updateOne(
        { _id: reporte._id },
        { $set: { eliminado: true } }
    )
    return reporte
}

export async function resolverReporte(id, estado) {
    if (!ObjectId.isValid(id)) {
        return null
    }
    const reporte = await db.collection("reportes").findOne({
        _id: new ObjectId(id),
        eliminado: { $ne: true }
    })
    if (!reporte) {
        return null
    }
    await db.collection("reportes").updateOne(
        { _id: reporte._id },
        { $set: { estado: estado } }
    )
    return await db.collection("reportes").findOne({
        _id: reporte._id
    })
}

export async function getReporteById(id, email) {
    if (!ObjectId.isValid(id)) {
        return null
    }

    const usuario = await db.collection("usuarios").findOne({ email })
    if (!usuario) {
        return null
    }
    const reporte = await db.collection("reportes").findOne({
        _id: new ObjectId(id),
        usuarioId: usuario._id,
        eliminado: { $ne: true }
    })

    if (reporte) {
        const sede = await db.collection("sedes").findOne({
            _id: reporte.sedeId
        })

        reporte.sedeNombre = sede?.nombre || "Sede no disponible"
    }

    return reporte
}

export async function getReporteAdminById(id) {
    if (!ObjectId.isValid(id)) {
        return null
    }
    const reporte = await db.collection("reportes").findOne({
        _id: new ObjectId(id),
        eliminado: { $ne: true }
    })
    if (!reporte) {
        return null
    }
    const sede = await db.collection("sedes").findOne({
        _id: reporte.sedeId
    })
    reporte.sedeNombre = sede?.nombre || "Sede no disponible"
    const usuario = await db.collection("usuarios").findOne({
        _id: reporte.usuarioId
    })

    reporte.usuarioNombre = usuario?.username || "Usuario no disponible"

    return reporte
}
