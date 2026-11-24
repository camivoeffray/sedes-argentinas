import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { sedesSchema } from "../../schemas/sedes"
import { useApiSedes } from "../../services/sedes.service"
import { useApiPaises } from "../../services/paises.service"

export default function EditarSede() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [sede, setSede] = useState(null)
    const [paises, setPaises] = useState([])
    const [estado, setEstado] = useState("LOADING")
    const [error, setError] = useState("")
    const { getSedeById, updateSede } = useApiSedes()
    const { getPaises } = useApiPaises()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(sedesSchema),
        values: sede || {
            nombre: "",
            paisId: "",
            tipo: "",
            ciudad: "",
            direccion: "",
            region: "",
            codigo_postal: "",
            telefono: "",
            celular_guardia: "",
            email: "",
            web: "",
            img: "",
            dias_atencion: "",
            horario_atencion: "",
            atencion_comentario: "",
            circunscripcion: "",
            redes_sociales: ""
        }
    })

    useEffect(() => {
        Promise.all([
            getSedeById(id),
            getPaises()
        ])
            .then(([datosSede, datosPaises]) => {
                setPaises(datosPaises)
                setSede({
                    nombre: datosSede.nombre ?? "",
                    paisId: datosSede.paisInfo?._id ?? "",
                    tipo: datosSede.tipo ?? "",
                    ciudad: datosSede.ciudad ?? "",
                    direccion: datosSede.direccion ?? "",
                    region: datosSede.region ?? "",
                    codigo_postal: datosSede.codigo_postal ?? "",
                    telefono: datosSede.telefono ?? "",
                    celular_guardia: datosSede.celular_guardia ?? "",
                    email: datosSede.email ?? "",
                    web: datosSede.web ?? "",
                    img: datosSede.img ?? "",
                    dias_atencion: datosSede.dias_atencion ?? "",
                    horario_atencion: datosSede.horario_atencion ?? "",
                    atencion_comentario: datosSede.atencion_comentario ?? "",
                    circunscripcion: datosSede.circunscripcion ?? "",
                    redes_sociales: Array.isArray(datosSede.redes_sociales)
                        ? datosSede.redes_sociales.join("\n")
                        : datosSede.redes_sociales ?? ""
                })

                setEstado("READY")
            })
            .catch(err => {
                console.error(err)
                setEstado("ERROR")
            })
    }, [id])

    const onSubmit = (datos) => {
        setError("")
        const sedeActualizada = {
            ...datos,
            redes_sociales: datos.redes_sociales
                ? datos.redes_sociales
                    .split("\n")
                    .map(red => red.trim())
                    .filter(red => red !== "")
                : []
        }

        updateSede(id, sedeActualizada)
            .then(() => navigate("/sedes/" + id))
            .catch(err => {
                console.error(err)
                setError("No se pudieron guardar los cambios.")
            })
    }

    if (estado === "LOADING") {
        return (
            <main className="container py-5">
                <p>Cargando sede...</p>
            </main>
        )
    }

    if (estado === "ERROR") {
        return (
            <main className="container py-5">
                <p className="alert alert-danger" role="alert">
                    No se pudo obtener la sede.
                </p>
                <Link to="/admin/sedes">
                    Volver a gestionar sedes
                </Link>
            </main>
        )
    }

    return (
        <main className="container py-5">
            <Link
                to={`/sedes/${id}`}
                className="btn btn-outline-secondary mb-4"
            >
                Volver a la sede
            </Link>

            <div className="card shadow-sm p-4">
                <h1 className="h3 mb-4">Editar sede</h1>

                {error && (
                    <p className="alert alert-danger" role="alert">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label">
                                Nombre de la sede
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                className="form-control"
                                {...register("nombre")}
                            />
                            {errors.nombre && (
                                <p className="text-danger">{errors.nombre.message}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="paisId" className="form-label">
                                País
                            </label>
                            <select
                                id="paisId"
                                className="form-select"
                                {...register("paisId")}
                            >
                                <option value="">Seleccioná un país</option>
                                {paises.map(pais => (
                                    <option key={pais._id} value={pais._id}>
                                        {pais.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.paisId && (
                                <p className="text-danger">{errors.paisId.message}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="tipo" className="form-label">
                                Tipo de sede
                            </label>
                            <input
                                id="tipo"
                                type="text"
                                className="form-control"
                                {...register("tipo")}
                            />
                            {errors.tipo && (
                                <p className="text-danger">{errors.tipo.message}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="ciudad" className="form-label">
                                Ciudad
                            </label>
                            <input
                                id="ciudad"
                                type="text"
                                className="form-control"
                                {...register("ciudad")}
                            />
                            {errors.ciudad && (
                                <p className="text-danger">{errors.ciudad.message}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="region" className="form-label">
                                Región
                            </label>
                            <input
                                id="region"
                                type="text"
                                className="form-control"
                                {...register("region")}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="direccion" className="form-label">
                                Dirección
                            </label>
                            <input
                                id="direccion"
                                type="text"
                                className="form-control"
                                {...register("direccion")}
                            />
                            {errors.direccion && (
                                <p className="text-danger">{errors.direccion.message}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="codigo_postal" className="form-label">
                                Código postal
                            </label>
                            <input
                                id="codigo_postal"
                                type="text"
                                className="form-control"
                                {...register("codigo_postal")}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="telefono" className="form-label">
                                Teléfono
                            </label>
                            <input
                                id="telefono"
                                type="tel"
                                className="form-control"
                                {...register("telefono")}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="celular_guardia" className="form-label">
                                Celular de guardia
                            </label>
                            <input
                                id="celular_guardia"
                                type="tel"
                                className="form-control"
                                {...register("celular_guardia")}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-danger">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="web" className="form-label">
                                Sitio web
                            </label>
                            <input
                                id="web"
                                type="url"
                                className="form-control"
                                {...register("web")}
                            />
                            {errors.web && (
                                <p className="text-danger">{errors.web.message}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="img" className="form-label">
                                URL de la imagen
                            </label>
                            <input
                                id="img"
                                type="url"
                                className="form-control"
                                {...register("img")}
                            />
                            {errors.img && (
                                <p className="text-danger">{errors.img.message}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="dias_atencion" className="form-label">
                                Días de atención
                            </label>
                            <input
                                id="dias_atencion"
                                type="text"
                                className="form-control"
                                {...register("dias_atencion")}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="horario_atencion" className="form-label">
                                Horario de atención
                            </label>
                            <input
                                id="horario_atencion"
                                type="text"
                                className="form-control"
                                {...register("horario_atencion")}
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="atencion_comentario" className="form-label">
                                Información adicional sobre la atención
                            </label>
                            <textarea
                                id="atencion_comentario"
                                className="form-control"
                                rows="3"
                                {...register("atencion_comentario")}
                            ></textarea>
                        </div>

                        <div className="col-12">
                            <label htmlFor="redes_sociales" className="form-label">
                                Redes sociales
                            </label>
                            <textarea
                                id="redes_sociales"
                                className="form-control"
                                rows="3"
                                placeholder="Una URL por línea"
                                {...register("redes_sociales")}
                            ></textarea>
                        </div>

                        <div className="col-12">
                            <label htmlFor="circunscripcion" className="form-label">
                                Circunscripción consular
                            </label>
                            <textarea
                                id="circunscripcion"
                                className="form-control"
                                rows="4"
                                {...register("circunscripcion")}
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary mt-4 d-block ms-auto"
                        disabled={isSubmitting}
                    >
                        Guardar cambios
                    </button>
                </form>
            </div>
        </main>
    )
}
