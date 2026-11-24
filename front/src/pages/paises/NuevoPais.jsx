import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { paisesSchema } from "../../schemas/paises"
import { useApiPaises } from "../../services/paises.service"
import { toast } from "react-toastify"

export default function NuevoPais() {
    const navigate = useNavigate()
    const { createPais } = useApiPaises()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(paisesSchema)
    })
    const onSubmit = async (datos) => {
        try {
            const pais = await createPais(datos)
            toast.success("País creado correctamente")
            navigate("/admin/paises/" + pais._id)

        } catch (err) {
            console.error(err)
            toast.error("No se pudo crear el país")
        }
    }
    return (
        <main className="container py-5">
            <Link
                to="/admin/paises"
                className="btn btn-outline-secondary mb-4"
            >
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Volver a países
            </Link>

            <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "650px" }}>
                <h1 className="h3 mb-4">Nuevo país</h1>
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
                            placeholder="https://ejemplo.com/imagen.jpg"
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
                        Guardar país
                    </button>
                </form>
            </div>
        </main>
    )
}
