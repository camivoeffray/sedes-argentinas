import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { usersLoginSchema } from "../../schemas/users"
import { useApiAuth } from "../../services/auth.service"
import { useLogin } from "../../context/session.context"
import logo from "../../assets/logosedes.svg"

export default function Login() {
    const navigate = useNavigate()
    const { login } = useApiAuth()
    const authLogin = useLogin()

    const [error, setError] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(usersLoginSchema)
    })

    const onSubmit = async (datos) => {
        setError("")

        try {
            const usuario = await login(datos)

            authLogin(usuario)
            toast.success("Sesión iniciada correctamente")
            navigate("/sedes")

        } catch (err) {
            console.error(err)
            setError("No se pudo iniciar sesión. Verificá tus credenciales.")
        }
    }

    return (
        <main className="auth-pagina">
            <div className="container py-5">
                <div className="card auth-card mx-auto">
                    <div className="text-center mb-4">
                        <img
                            src={logo}
                            alt="Sedes Argentinas"
                            className="auth-logo mb-3"
                        />

                        <h1 className="h3 fw-bold mb-2">
                            Bienvenido de nuevo
                        </h1>

                        <p className="text-secondary small mb-0">
                            Ingresá a tu cuenta de Sedes Argentinas
                        </p>
                    </div>

                    {error && (
                        <p className="alert alert-danger" role="alert">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-medium">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="nombre@correo.com"
                                autoComplete="email"
                                {...register("email")}
                            />

                            {errors.email && (
                                <p className="text-danger small mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label fw-medium">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                autoComplete="current-password"
                                {...register("password")}
                            />

                            {errors.password && (
                                <p className="text-danger small mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting}
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    <p className="mt-4 mb-0 text-center small text-secondary">
                        ¿No tenés cuenta?{" "}
                        <Link to="/registro" className="fw-semibold">
                            Registrate
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
