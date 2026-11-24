import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { paisesSchema } from "../../schemas/paises"
import { useApiPaises } from "../../services/paises.service"
import { toast } from "react-toastify"

export default function EditarPais() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pais, setPais] = useState(null)
    const [estado, setEstado] = useState("LOADING")
    const { getPaisById, updatePais } = useApiPaises()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(paisesSchema),
        values: pais
            ? {
                nombre: pais.nombre,
                foto: pais.foto,
                descripcion: pais.descripcion
            }
            : {
                nombre: "",
                foto: "",
                descripcion: ""
            }
    })

    useEffect(() => {
        getPaisById(id)
            .then(data => {
                setPais(data)
                setEstado("READY")
            })
            .catch(err => {
                console.error(err)
                setEstado("ERROR")
            })
    }, [id])
    
        const onSubmit = (datos) => {
            updatePais(id, datos)
                .then(() => {
                    toast.success("País actualizado correctamente")
                    navigate("/admin/paises/" + id)
                })
                .catch(err => {
                    console.error(err)
                    toast.error("No se pudo guardar los cambios")
                })
        }

    if (estado === "LOADING") {
        return (
            <main className="container py-5">
                <p>Cargando país...</p>
            </main>
        )
    }

    if (estado === "ERROR") {
        return (
            <main className="container py-5">
                <p className="alert alert-danger" role="alert">
                    No se pudo obtener el país.
                </p>
                <Link to="/admin/paises">
                    Volver a gestionar países
                </Link>
            </main>
        )
    }

    return (
        <main className="container py-5">
            <Link
                to={`/admin/paises/${id}`}
                className="btn btn-outline-secondary mb-4"
            >
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Volver al país
            </Link>

            <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "650px" }}>
                <h1 className="h3 mb-4">Editar país</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre del país
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            className="form-control"
                            {...register("nombre")}
                        />

                        {errors.nombre && (
                            <p className="text-danger mt-1">
                                {errors.nombre.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="foto" className="form-label">
                            URL de la imagen
                        </label>

                        <input
                            id="foto"
                            type="url"
                            className="form-control"
                            {...register("foto")}
                        />

                        {errors.foto && (
                            <p className="text-danger mt-1">
                                {errors.foto.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descripcion" className="form-label">
                            Descripción
                        </label>

                        <textarea
                            id="descripcion"
                            className="form-control"
                            rows="5"
                            {...register("descripcion")}
                        ></textarea>

                        {errors.descripcion && (
                            <p className="text-danger mt-1">
                                {errors.descripcion.message}
                            </p>
                        )}
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
        </main>
    )
}
