import { useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { usersRegisterSchema } from "../../schemas/users"
import { useApiAuth } from "../../services/auth.service"
import logo from "../../assets/logosedes.svg"

export default function Register() {
    const navigate = useNavigate()
    const { register: registerApi } = useApiAuth()

    const [error, setError] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(usersRegisterSchema),
        criteriaMode: "all"
    })

    const onSubmit = async (usuario) => {
        setError("")

        try {
            await registerApi(usuario)

            toast.success("Cuenta creada correctamente. Ya podés iniciar sesión.")
            navigate("/login")

        } catch (err) {
            console.error(err)
            setError("No se pudo completar el registro.")
        }
    }

    return (
        <main className="auth-pagina">
            <div className="container py-5">
                <div className="card auth-card auth-card-registro mx-auto">
                    <div className="text-center mb-4">
                        <img
                            src={logo}
                            alt="Sedes Argentinas"
                            className="auth-logo mb-3"
                        />

                        <h1 className="h3 fw-bold mb-2">
                            Crear cuenta
                        </h1>

                        <p className="text-secondary small mb-0">
                            Registrate para colaborar con la actualización
                            de las sedes argentinas en el mundo.
                        </p>
                    </div>

                    {error && (
                        <p className="alert alert-danger" role="alert">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-medium">
                                Nombre
                            </label>

                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                autoComplete="name"
                                {...register("name")}
                            />

                            {errors.name && (
                                <p className="text-danger small mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label fw-medium">
                                Nombre de usuario
                            </label>

                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                autoComplete="username"
                                {...register("username")}
                            />

                            {errors.username && (
                                <p className="text-danger small mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-medium">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                autoComplete="email"
                                {...register("email")}
                            />

                            {errors.email && (
                                <p className="text-danger small mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-medium">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                autoComplete="new-password"
                                aria-describedby="password-ayuda"
                                {...register("password")}
                            />

                            <div id="password-ayuda" className="form-text">
                                Mínimo 8 caracteres, con mayúscula,
                                minúscula, número y símbolo.
                            </div>

                            {errors.password && (
                                <p className="text-danger small mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="passwordConfirm" className="form-label fw-medium">
                                Confirmar contraseña
                            </label>

                            <input
                                type="password"
                                id="passwordConfirm"
                                className="form-control"
                                autoComplete="new-password"
                                {...register("passwordConfirm")}
                            />

                            {errors.passwordConfirm && (
                                <p className="text-danger small mt-1">
                                    {errors.passwordConfirm.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting}
                        >
                            Registrarme
                        </button>
                    </form>

                    <p className="mt-4 mb-0 text-center small text-secondary">
                        ¿Ya tenés cuenta?{" "}
                        <Link to="/login" className="fw-semibold">
                            Iniciá sesión
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
