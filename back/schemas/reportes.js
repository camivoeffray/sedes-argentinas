import { z } from "zod"

export const reportesSchema = z.object({
    sedeId: z.string("La sede es obligatoria")
        .min(1, "Debe indicar una sede"),

    campo: z.enum(
        ["telefono", "direccion", "horarios", "web", "otro"],
        "Debe seleccionar un campo válido"
    ),

    descripcion: z.string("La descripción es obligatoria")
        .min(10, "La descripción debe tener al menos 10 caracteres"),

    valorPropuesto: z.string().optional()
})

export const reportesEdicionSchema = z.object({
    campo: z.enum(
        ["telefono", "direccion", "horarios", "web", "otro"]
    ),
    descripcion: z.string()
        .min(10, "La descripción debe tener al menos 10 caracteres"),
    valorPropuesto: z.string().optional()
})

export const reportesEstadoSchema = z.object({
    estado: z.enum(["aprobado", "rechazado"])
})