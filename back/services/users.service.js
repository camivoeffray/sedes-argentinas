import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const MONGO_URI = process.env.MONGO_URI
const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function getUsers() {
    return await db.collection("usuarios")
        .find({}, { projection: { password: 0 } })
        .toArray()
}

export async function getUserById(id) {
    return await db.collection("usuarios").findOne(
        { _id: new ObjectId(id) },
        { projection: { password: 0 } }
    )
}

export async function saveUsers(usuario) {
    const existe = await db.collection("usuarios")
        .findOne({ email: usuario.email })

    if (existe) return false

    usuario.password = await bcrypt.hash(usuario.password, 10)
    delete usuario.passwordConfirm

    usuario.rol = "user"

    const user = await db.collection("usuarios").insertOne(usuario)
    return user
}

export async function login(usuario) {
    const usuarioDB = await db.collection("usuarios")
        .findOne({ email: usuario.email })

    if (!usuarioDB) return false

    const valido = await bcrypt.compare(
        usuario.password,
        usuarioDB.password
    )

    if (!valido) return false

    const payload = {
        email: usuarioDB.email,
        usuario: usuarioDB.username,
        name: usuarioDB.name,
        rol: usuarioDB.rol
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h"
    })

    return {
        email: usuarioDB.email,
        usuario: usuarioDB.username,
        name: usuarioDB.name,
        rol: usuarioDB.rol,
        token: token
    }
}
