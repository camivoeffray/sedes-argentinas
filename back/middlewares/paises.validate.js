import { paisesSchema } from "../schemas/paises.js"

export async function validatePais(req, res, next) {
    console.log("validando...")
    try {
        const paisValidado = await paisesSchema.parseAsync(req.body)
        req.body = paisValidado
        next()
    } catch (errors) {
        const messages = errors?.issues?.map(
            error => `${error?.path?.join(", ")} : ${error?.message}`
        )
        res.status(400).json(messages)
    }
}
