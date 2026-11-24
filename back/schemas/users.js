import { z } from "zod"

export const usersRegisterSchema = z.object({
    name: z.string("El campo nombre es obligatorio")
        .min(3, "El nombre debe tener como mínimo 3 caracteres"),

    username: z.string("El campo username es obligatorio")
        .min(3, "El username debe tener como mínimo 3 caracteres"),

    email: z.email("El campo debe ser un email válido"),

    password: z.string("El campo contraseña es obligatorio")
        .min(8, "La contraseña debe tener como mínimo 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[@_#$%&/()=]/, "Debe contener al menos un símbolo"),

    passwordConfirm: z.string("Debés confirmar la contraseña")

}).refine((data) => data.password === data.passwordConfirm, {
    error: "Las contraseñas no coinciden",
    path: ["passwordConfirm"]
})

export const usersLoginSchema = z.object({
    email: z.email("El campo debe ser un email válido"),
    password: z.string("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener como mínimo 8 caracteres")
})
