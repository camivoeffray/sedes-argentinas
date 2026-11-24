import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { reportesSchema } from "../../schemas/reportes"
import { useApiReportes } from "../../services/reportes.service"

export default function EditarReporte() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getReporteById, updateReporte } = useApiReportes()
    const [estado, setEstado] = useState("LOADING")

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(reportesSchema)
    })
    
    useEffect(() => {
        getReporteById(id)
            .then(reporte => {
                if (reporte.estado === "pendiente") {
                    reset(reporte)
                    setEstado("READY")
                } else {
                    setEstado("ERROR")
                }
            })
            .catch(error => {
                console.error(error)
                setEstado("ERROR")
            })
    }, [id])
    const onSubmit = async (datos) => {
        try {
            await updateReporte(id, datos)

            toast.success("Reporte actualizado correctamente")
            navigate("/mis-reportes")

        } catch (error) {
            console.error(error)
            toast.error("No pudimos actualizar tu reporte")
        }
    }
    return (
        <main className="container py-5">
            <Link to="/mis-reportes" className="btn btn-outline-secondary mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Volver a mis reportes
            </Link>

            {estado === "LOADING" && <p>Cargando reporte...</p>}

            {estado === "ERROR" && (
                <p className="alert alert-danger">
                    No se encontró el reporte o ya no se puede editar.
                </p>
            )}

            {estado === "READY" && (
                <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "650px" }}>
                    <h1 className="h3 mb-4">Editar reporte</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="campo" className="form-label">
                                ¿Qué dato es incorrecto?
                            </label>

                            <select
                                id="campo"
                                className="form-select"
                                {...register("campo")}
                            >
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
                                id="valorPropuesto"
                                type="text"
                                className="form-control"
                                {...register("valorPropuesto")}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary d-block ms-auto"
                            disabled={isSubmitting}
                        >
                            Guardar cambios
                        </button>
                    </form>
                </div>
            )}
        </main>
    )
}
