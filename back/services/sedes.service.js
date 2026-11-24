import { MongoClient, ObjectId } from "mongodb"
import * as paisesService from "./paises.service.js"

const MONGO_URI = process.env.MONGO_URI
const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function getSedes(filtros = {}) {
    const paisesEliminados = await db.collection("paises")
        .find({ eliminado: true })
        .toArray()
    const idsEliminados = paisesEliminados.map(pais => pais._id)

    const filter = {
        eliminado: { $ne: true },
        "paisInfo._id": { $nin: idsEliminados }
    }

    if (filtros?.pais) {
        filter.pais = {
            $regex: filtros.pais,
            $options: "i"
        }
    }

    if (filtros?.tipo) {
        filter.tipo = {
            $regex: `^${filtros.tipo}$`,
            $options: "i"
        }
    }

    let consulta = db.collection("sedes").find(filter)

    if (filtros?.page || filtros?.limit) {
        const page = parseInt(filtros?.page ?? 1)
        const limit = parseInt(filtros?.limit ?? 12)
        const skip = (page - 1) * limit

        consulta = consulta.skip(skip).limit(limit)
    }

    const sedes = await consulta.toArray()
    return sedes
}

export async function getSedeById(id) {
    if (!ObjectId.isValid(id)) {
        return null
    }

    const sede = await db.collection("sedes").findOne({
        _id: new ObjectId(id),
        eliminado: { $ne: true }
    })

    return sede
}

export async function guardarSede(sede) {
    if (!sede.paisId) {
        return null
    }

    const pais = await paisesService.getPaisById(sede.paisId)

    if (!pais) {
        return null
    }

    sede.pais = pais.nombre
    sede.paisInfo = {
        _id: pais._id,
        nombre: pais.nombre,
        foto: pais.foto,
        descripcion: pais.descripcion
    }

    delete sede.paisId

    await db.collection("sedes").insertOne(sede)

    return sede
}

export async function editarSede(id, sede) {
    const sedeExistente = await getSedeById(id)

    if (!sedeExistente) {
        return null
    }

    delete sede.pais
    delete sede.paisInfo

    if (sede.paisId) {
        const pais = await paisesService.getPaisById(sede.paisId)

        if (!pais) {
            return null
        }

        sede.pais = pais.nombre
        sede.paisInfo = {
            _id: pais._id,
            nombre: pais.nombre,
            foto: pais.foto,
            descripcion: pais.descripcion
        }

        delete sede.paisId
    }

    await db.collection("sedes").updateOne(
        { _id: new ObjectId(id) },
        { $set: sede }
    )

    return getSedeById(id)
}

export async function eliminarSede(id) {
    const sede = await getSedeById(id)

    if (!sede) {
        return null
    }

    await db.collection("sedes").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } }
    )

    return sede
}
