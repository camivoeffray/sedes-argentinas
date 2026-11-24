import { z } from "zod"

export const usersRegisterSchema = z.object({
    name: z.string("Por favor ingresá un nombre")
        .min(3, "El nombre debe tener al menos 3 caracteres"),

    username: z.string("El nombre de usuario es obligatorio")
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),

    email: z.email("Por favor, ingresá un correo electrónico válido"),

    password: z.string("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener una mayúscula")
        .regex(/[a-z]/, "Debe contener una minúscula")
        .regex(/[0-9]/, "Debe contener un número")
        .regex(/[@_#$%&/()=]/, "Debe contener un símbolo"),

    passwordConfirm: z.string("Confirmá tu contraseña")
}).refine((data) => data.password === data.passwordConfirm, {
    error: "Las contraseñas no coinciden",
    path: ["passwordConfirm"]
})

export const usersLoginSchema = z.object({
    email: z.email("Ingresá un correo electrónico válido"),
    password: z.string().min(1, "Ingresá tu contraseña")
})
