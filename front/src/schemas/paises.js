import { z } from "zod"

export const paisesSchema = z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    foto: z.url("Ingresá una URL válida para la imagen"),
    descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres")
})
