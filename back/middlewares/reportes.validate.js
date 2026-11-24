import { reportesSchema, reportesEdicionSchema, reportesEstadoSchema } from "../schemas/reportes.js"

export async function validateReporte(req, res, next) {
    console.log("validando...")
    try {
        const reporteValidado = await reportesSchema.parseAsync(req.body)
        req.body = reporteValidado
        next()
    } catch (errors) {
        const messages = errors?.issues?.map(
            error => `${error?.path?.join(", ")} : ${error?.message}`
        )
        res.status(400).json(messages)
    }
}

export async function validateEdicionReporte(req, res, next) {
    try {
        const reporteValidado = await reportesEdicionSchema.parseAsync(req.body)
        req.body = reporteValidado
        next()
    } catch (errors) {
        const messages = errors?.issues?.map(
            error => `${error?.path?.join(", ")} : ${error?.message}`
        )
        res.status(400).json(messages)
    }
}

export async function validateEstadoReporte(req, res, next) {
    try {
        const estadoValidado = await reportesEstadoSchema.parseAsync(req.body)
        req.body = estadoValidado
        next()
    } catch (errors) {
        const messages = errors?.issues?.map(
            error => `${error?.path?.join(", ")} : ${error?.message}`
        )
        res.status(400).json(messages)
    }
}