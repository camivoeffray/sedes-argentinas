import { sedesSchema } from "../schemas/sedes.js"

export async function validateSede(req, res, next) {
    try {
        const sedeValidada = await sedesSchema.parseAsync(req.body)
        req.body = sedeValidada
        next()
    } catch (errors) {
        const messages = errors?.issues?.map(
            error => `${error?.path?.join(", ")} : ${error?.message}`
        )
        res.status(400).json(messages)
    }
}
