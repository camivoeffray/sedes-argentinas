import * as paisesService from "../../services/paises.service.js"

export async function getPaises(req, res) {
    try {
        const paises = await paisesService.getPaises(req.query)
        res.status(200).json(paises)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function savePais(req, res) {
    try {
        const pais = await paisesService.guardarPais(req.body)
        if (pais) {
            res.status(200).json(pais)
        } else if (pais === false) {
            res.status(400).json({
                message: "El país ya se encuentra registrado"
            })
        }else {
            res.status(400).json({
                message: "Nombre, foto y descripción son obligatorios"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function getPaisById(req, res) {
    try {
        const pais = await paisesService.getPaisById(req.params.id)
        if (pais) {
            res.status(200).json(pais)
        } else {
            res.status(404).json({
                message: "País no encontrado"
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "No se pudo obtener el país"
        })
    }
}

export async function getSedesByPais(req, res) {
    try {
        const id = req.params.id
        const pais = await paisesService.getPaisById(id)
        if (!pais || pais.eliminado === true) {
            return res.status(404).json({
                message: "País no encontrado"
            })
        }
        const sedes = await paisesService.getSedesByPais(id)
        res.status(200).json(sedes)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function eliminarPais(req, res) {
    try {
        const id = req.params.id
        const pais = await paisesService.eliminarPais(id)
        if (pais) {
            res.status(200).json({
                message: "País eliminado correctamente"
            })
        } else {
            res.status(404).json({
                message: "País no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function editarPais(req, res) {
    try {
        const id = req.params.id
        const pais = await paisesService.editarPais(id, req.body)

        if (pais) {
            res.status(200).json(pais)
        } else {
            res.status(404).json({
                message: "País no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "No se pudo editar el país"
        })
    }
}








//Controllers utilizados únicamente para actualizar las sedes con la información de su correspondiente país.
export async function actualizarSedesPais(req, res) {
    try {
        const id = req.params.id
        const resultado = await paisesService.actualizarSedesPais(id)
        if (resultado) {
            res.status(200).json({
                message: "Sedes actualizadas correctamente",
                cantidad: resultado.modifiedCount //con esto sé cuantas sedes modificó
            })
        } else {
            res.status(404).json({
                message: "País no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function actualizarTodasLasSedes(req, res) {
    try {
        const cantidad = await paisesService.actualizarTodasLasSedes()
        res.status(200).json({
            message: "Sedes actualizadas correctamente",
            cantidad: cantidad
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}