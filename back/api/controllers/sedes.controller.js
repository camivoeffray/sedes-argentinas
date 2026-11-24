import * as sedesService from "../../services/sedes.service.js"
import * as paisesService from "../../services/paises.service.js"

export async function getSedes(req, res) {
    try {
        const filtros = req.query
        const sedes = await sedesService.getSedes(filtros)
        res.status(200).json(sedes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export async function getSedeById(req, res) {
    try {
        const id = req.params.id
        const sede = await sedesService.getSedeById(id)
        if (!sede || sede.eliminado === true) {
            return res.status(404).json({
                message: "Sede no encontrada"
            })
        }
        if (sede.paisInfo?._id) {
            const pais = await paisesService.getPaisById(sede.paisInfo._id)
            if (!pais || pais.eliminado === true) {
                return res.status(404).json({
                    message: "Sede no encontrada"
                })
            }
        }
        res.status(200).json(sede)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export async function saveSede(req, res) {
    try {
        const sede = await sedesService.guardarSede(req.body)
        if (sede) {
            res.status(200).json(sede)
        } else {
            res.status(404).json({
                message: "Debe indicar un país válido"
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export async function updateSede(req, res) {
    try {
        const id = req.params.id
        const sedeActual = await sedesService.getSedeById(id)
        if (!sedeActual) {
            return res.status(404).json({
                message: "Sede no encontrada"
            })
        }
        const sede = await sedesService.editarSede(id, req.body)
        if (sede) {
            res.status(200).json(sede)
        } else {
            res.status(400).json({
                message: "El país indicado no existe"
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export async function deleteSede(req, res) {
    try {
        const id = req.params.id
        const sede = await sedesService.eliminarSede(id)
        if (sede) {
            res.status(200).json(sede)
        } else {
            res.status(404).json({ message: "No se pudo eliminar porque no se encontró la sede" })
        }
    } catch (error) {
        res.status(500).json({
            message: "No se pudo eliminar la sede"
        })
    }
}