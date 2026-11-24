import { z } from "zod"

export const sedesSchema = z.object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    paisId: z.string().min(1, "Seleccioná un país"),
    tipo: z.string().min(2, "Ingresá el tipo de sede"),
    ciudad: z.string().min(2, "Ingresá la ciudad"),
    direccion: z.string().min(3, "Ingresá la dirección"),

    region: z.string().nullish(),
    codigo_postal: z.string().nullish(),
    telefono: z.string().nullish(),
    celular_guardia: z.string().nullish(),
    email: z.union([z.email(), z.literal("")]).nullish(),
    web: z.union([z.url(), z.literal("")]).nullish(),
    img: z.union([z.url(), z.literal("")]).nullish(),
    dias_atencion: z.string().nullish(),
    horario_atencion: z.string().nullish(),
    atencion_comentario: z.string().nullish(),
    circunscripcion: z.string().nullish(),
    redes_sociales: z.array(z.string()).nullish()
})
