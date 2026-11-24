import * as userService from "../../services/users.service.js"

export async function getUsers(req, res) {
    try {
        const usuarios = await userService.getUsers()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ message: "No se pueden obtener los usuarios" })
    }
}

export async function saveUsers(req, res) {
    try {
        const user = await userService.saveUsers(req.body)

        if (!user) {
            return res.status(409).json({
                message: "El email ya está registrado"
            })
        }

        res.status(201).json({
            message: "Usuario registrado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            message: "No se pudo crear el usuario"
        })
    }
}

export async function login(req, res) {
    try {
        const user = await userService.login(req.body)

        if (!user) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: "No se pudo iniciar sesión"
        })
    }
}
