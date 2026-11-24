import { z } from "zod"

export const sedesSchema = z.object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    paisId: z.string().min(1, "Seleccioná un país"),
    tipo: z.string().min(2, "Ingresá el tipo de sede"),
    ciudad: z.string().min(2, "Ingresá la ciudad"),
    direccion: z.string().min(3, "Ingresá la dirección"),
    region: z.string().optional(),
    codigo_postal: z.string().optional(),
    telefono: z.string().optional(),
    celular_guardia: z.string().optional(),
    email: z.union([z.email("Ingresá un correo válido"), z.literal("")]),
    web: z.union([z.url("Ingresá una URL válida"), z.literal("")]),
    img: z.union([z.url("Ingresá una URL válida"), z.literal("")]),
    dias_atencion: z.string().optional(),
    horario_atencion: z.string().optional(),
    atencion_comentario: z.string().optional(),
    circunscripcion: z.string().optional(),
    redes_sociales: z.string().optional()
})
