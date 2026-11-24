import * as reportesService from "../../services/reportes.service.js"

export async function saveReporte(req, res) {
    try {
        const reporte = await reportesService.guardarReporte(
            req.body,
            req.usuario.email
        )
        if (reporte) {
            res.status(201).json(reporte)
        } else {
            res.status(404).json({
                message: "Usuario o sede no encontrada."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "No se pudo crear el reporte."
        })
    }
}

export async function getReportes(req, res) {
    try {
        const reportes = await reportesService.getReportes()
        res.status(200).json(reportes)
    } catch (error) {
    res.status(500).json({
        message: "No se pudo obtener los reportes."
    })
}
}

export async function getMisReportes(req, res) {
    try {
        const reportes = await reportesService.getReportesByUsuario(
            req.usuario.email
        )
        if (reportes) {
            res.status(200).json(reportes)
        } else {
            res.status(404).json({
                message: "Usuario no encontrado."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "No fue posible obtener los reportes."
        })
    }
}

export async function editarReporte(req, res) {
    try {
        const reporte = await reportesService.editarReporte(
            req.params.id,
            req.body,
            req.usuario.email
        )
        if (reporte) {
            res.status(200).json(reporte)
        } else {
            res.status(404).json({
                message: "Reporte no encontrado o no se puede editar"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "No se pudo editar el reporte"
        })
    }
}

export async function eliminarReporte(req, res) {
    try {
        const reporte = await reportesService.eliminarReporte(
            req.params.id,
            req.usuario.email
        )
        if (reporte) {
            res.status(200).json({
                message: "Reporte eliminado correctamente."
            })
        } else {
            res.status(404).json({
                message: "Reporte no encontrado o no se puede eliminar."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "No se pudo eliminar el reporte."
        })
    }
}

export async function resolverReporte(req, res) {
    try {
        const reporte = await reportesService.resolverReporte(
            req.params.id,
            req.body.estado
        )
        if (reporte) {
            res.status(200).json(reporte)
        } else {
            res.status(404).json({
                message: "Reporte no encontrado o ya resuelto"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "No se pudo resolver el reporte"
        })
    }
}

export async function getReporteById(req, res) {
    try {
        const reporte = await reportesService.getReporteById(
            req.params.id,
            req.usuario.email
        )
        if (reporte) {
            res.status(200).json(reporte)
        } else {
            res.status(404).json({
                message: "Reporte no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "No se pudo obtener el reporte"
        })
    }
}

export async function getReporteAdminById(req, res) {
    try {
        const reporte = await reportesService.getReporteAdminById(req.params.id)

        if (reporte) {
            res.status(200).json(reporte)
        } else {
            res.status(404).json({
                message: "Reporte no encontrado"
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "No se pudo obtener el reporte"
        })
    }
}
