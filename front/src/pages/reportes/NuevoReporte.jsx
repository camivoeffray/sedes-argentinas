import { Link, useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { reportesSchema } from "../../schemas/reportes"
import { useApiReportes } from "../../services/reportes.service"

export default function NuevoReporte() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { createReporte } = useApiReportes()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(reportesSchema)
    })
    const onSubmit = async (datos) => {
        try {
            await createReporte({
                ...datos,
                sedeId: id
            })
            toast.success("¡Gracias por colaborar! Tu reporte fue enviado correctamente.")
            navigate("/mis-reportes")
        } catch (error) {
            console.error(error)
            toast.error("No se pudo enviar el reporte")
        }
    }
    return (
        <main className="container py-5">
            <Link
                to={`/sedes/${id}`}
                className="btn btn-outline-secondary mb-4"
            >
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Volver a la sede
            </Link>

            <div className="card shadow-sm p-4 mx-auto card-reporte">
                <h1 className="h3 mb-3">Reportar información incorrecta</h1>

                <p>
                    Contanos qué dato necesita revisarse.
                    Tu reporte será evaluado antes de actualizar
                    la información publicada.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="campo" className="form-label">
                            ¿Qué dato es incorrecto?
                        </label>

                        <select
                            id="campo"
                            className="form-select"
                            defaultValue=""
                            {...register("campo")}
                        >
                            <option value="" disabled>
                                Seleccioná una opción
                            </option>
                            <option value="telefono">Teléfono</option>
                            <option value="direccion">Dirección</option>
                            <option value="horarios">Horarios de atención</option>
                            <option value="web">Página web</option>
                            <option value="otro">Otro dato</option>
                        </select>

                        {errors.campo && (
                            <p className="text-danger mt-1">
                                {errors.campo.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">
                            Describí el problema
                        </label>

                        <textarea
                            id="descripcion"
                            className="form-control"
                            rows="4"
                            {...register("descripcion")}
                        ></textarea>

                        {errors.descripcion && (
                            <p className="text-danger mt-1">
                                {errors.descripcion.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="valorPropuesto" className="form-label">
                            ¿Conocés el dato correcto? (opcional)
                        </label>

                        <input
                            type="text"
                            id="valorPropuesto"
                            className="form-control"
                            {...register("valorPropuesto")}
                        />

                        {errors.valorPropuesto && (
                            <p className="text-danger mt-1">
                                {errors.valorPropuesto.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary d-block ms-auto"
                        disabled={isSubmitting}
                    >
                        <i className="bi bi-send me-2" aria-hidden="true"></i>
                        Enviar reporte
                    </button>
                </form>
            </div>
        </main>
    )
}
