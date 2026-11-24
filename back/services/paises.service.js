import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = process.env.MONGO_URI
const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function getPaises(filtros = {}) {
    let consulta = db.collection("paises").find({
        eliminado: { $ne: true }
    })
    if (filtros?.page || filtros?.limit) {
        const page = parseInt(filtros?.page ?? 1)
        const limit = parseInt(filtros?.limit ?? 12)
        const skip = (page - 1) * limit

        consulta = consulta.skip(skip).limit(limit)
    }
    const paises = await consulta.toArray()
    return paises
}

export async function guardarPais(pais) {
    if (!pais.nombre || !pais.foto || !pais.descripcion) {
        return null
    }

    const paisExistente = await db.collection("paises").findOne({
        nombre: pais.nombre
    })

    if (paisExistente) {
        return false
    }

    await db.collection("paises").insertOne(pais)
    return pais
}

export async function getPaisById(id) {
    if (!ObjectId.isValid(id)) {
        return null
    }
    const pais = await db.collection("paises").findOne({
        _id: new ObjectId(id),
        eliminado: { $ne: true }
    })

    return pais
}

export async function getSedesByPais(id) {
    const sedes = await db.collection("sedes").find({
        "paisInfo._id": new ObjectId(id),
        eliminado: { $ne: true }
    }).toArray()

    return sedes
}

export async function eliminarPais(id) {
    const pais = await getPaisById(id)
    if (!pais || pais.eliminado === true) {
        return null
    }
    await db.collection("paises").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } }
    )
    return pais
}

export async function editarPais(id, datos) {
    const pais = await getPaisById(id)
    if (!pais || pais.eliminado === true) {
        return null
    }
    const resultado = await db.collection("paises").updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                nombre: datos.nombre,
                foto: datos.foto,
                descripcion: datos.descripcion
            }
        }
    )
    await db.collection("sedes").updateMany(
        { "paisInfo._id": new ObjectId(id) },
        {
            $set: {
                pais: datos.nombre,
                "paisInfo.nombre": datos.nombre,
                "paisInfo.foto": datos.foto,
                "paisInfo.descripcion": datos.descripcion
            }
        }
    )
    return await getPaisById(id)
}




// Función utilizada para migrar las sedes existentes de un país, agregando paisInfo a cada una.
export async function actualizarSedesPais(id) { 
    const pais = await getPaisById(id)
    if (!pais) {
        return null
    }
    const objetoPais = await db.collection("sedes").updateMany(
        { pais: pais.nombre },
        {
            $set: {
                paisInfo: {
                    _id: pais._id,
                    nombre: pais.nombre,
                    foto: pais.foto,
                    descripcion: pais.descripcion
                }
            }
        }
    )
    return objetoPais
}

//Función que recorre todos los países y actualiza sus sedes existentes.
export async function actualizarTodasLasSedes() {
    const paises = await getPaises()
    let cantidad = 0

    for (const pais of paises) {
        const resultado = await actualizarSedesPais(pais._id)
        cantidad += resultado.modifiedCount
    }

    return cantidad
}