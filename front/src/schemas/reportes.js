import { z } from "zod"

export const reportesSchema = z.object({
    campo: z.enum(
        ["telefono", "direccion", "horarios", "web", "otro"],
        "Seleccioná un dato para reportar"
    ),

    descripcion: z.string()
        .min(10, "La descripción debe tener al menos 10 caracteres"),

    valorPropuesto: z.string().optional()
})
