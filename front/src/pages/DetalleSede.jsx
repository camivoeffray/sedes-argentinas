import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { useApiSedes } from "../services/sedes.service"
import { useUsuario, useRol } from "../context/session.context"
import BannerColaborar from "../components/BannerColaborar.jsx"

export default function DetalleSede() {
    const usuario = useUsuario()
    const obtenerRol = useRol()
    const { id } = useParams()
    const { getSedeById } = useApiSedes()
    const [sede, setSede] = useState(null)
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        getSedeById(id)
            .then(data => {
                setSede(data)
                setEstado("READY")
            })
            .catch(error => {
                console.error(error)
                setEstado("ERROR")
            })
    }, [id])

    if (estado === "LOADING") {
        return (
            <main className="container py-5">
                <p>Cargando información de la sede...</p>
            </main>
        )
    }

    if (estado === "ERROR") {
        return (
            <main className="container py-5">
                <p className="alert alert-danger" role="alert">
                    No se pudo obtener la información de la sede.
                </p>
                <Link to="/sedes" className="btn btn-primary btn-sm">
                    Volver a las sedes
                </Link>
            </main>
        )
    }

    return (
        <main className="container py-5 detalle-sede">
            <Link to="/sedes" className="btn btn-outline-secondary btn-sm mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Volver a las sedes
            </Link>

            <article>
                <div className="row g-4 mb-4 align-items-start">
                    <div className="col-lg-5">
                        <img
                            src={sede.img}
                            alt={`Imagen ilustrativa de ${sede.nombre}`}
                            className="detalle-sede-imagen w-100"
                        />
                    </div>

                    <div className="col-lg-7">
                        <p className="sede-pais mb-2">
                            {sede.pais} {sede.region && `· ${sede.region}`}
                        </p>

                        <h1 className="h2 fw-bold mb-3">{sede.nombre}</h1>

                        <p className="text-secondary mb-3">
                            <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
                            {sede.ciudad}
                        </p>

                        <p className="mb-3">
                            <span className="sede-tipo">{sede.tipo}</span>
                        </p>

                        {sede.estado && (
                            <p className="small text-secondary">
                                Estado de la sede: {sede.estado}
                            </p>
                        )}

                        {usuario && obtenerRol() === "admin" && (
                            <div className="d-flex gap-2 flex-wrap mt-4">
                                <Link
                                    to={`/admin/sedes/editar/${sede._id}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    <i className="bi bi-pencil me-2" aria-hidden="true"></i>
                                    Editar sede
                                </Link>

                                <Link
                                    to={`/admin/sedes/eliminar/${sede._id}`}
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    <i className="bi bi-trash me-2" aria-hidden="true"></i>
                                    Eliminar sede
                                </Link>
                            </div>
                        )}
                        {(!usuario || obtenerRol() === "user") && (
                            <div className="mt-4">
                                {!usuario && (
                                    <Link to="/login" className="btn btn-primary btn-sm">
                                        Reportar información incorrecta
                                    </Link>
                                )}

                                {usuario && obtenerRol() === "user" && (
                                    <Link
                                        to={`/sedes/${id}/reportar`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        <i className="bi bi-exclamation-circle me-2" aria-hidden="true"></i>
                                        Reportar información incorrecta
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="row g-3">
                    <section className="col-md-6 col-lg-4">
                        <div className="card h-100 detalle-sede-card">
                            <div className="card-body">
                                <h2 className="h5 fw-semibold mb-4">
                                    <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
                                    Ubicación
                                </h2>

                                <dl>
                                    <dt>País</dt>
                                    <dd>{sede.pais || "No disponible"}</dd>

                                    <dt>Ciudad</dt>
                                    <dd>{sede.ciudad || "No disponible"}</dd>

                                    <dt>Dirección</dt>
                                    <dd>{sede.direccion || "No disponible"}</dd>

                                    <dt>Código postal</dt>
                                    <dd>{sede.codigo_postal || "No disponible"}</dd>

                                    <dt>Región</dt>
                                    <dd>{sede.region || "No disponible"}</dd>
                                </dl>
                            </div>
                        </div>
                    </section>

                    <section className="col-md-6 col-lg-4">
                        <div className="card h-100 detalle-sede-card">
                            <div className="card-body">
                                <h2 className="h5 fw-semibold mb-4">
                                    <i className="bi bi-telephone me-2" aria-hidden="true"></i>
                                    Contacto
                                </h2>

                                <dl>
                                    <dt>Teléfono</dt>
                                    <dd>{sede.telefono || "No disponible"}</dd>

                                    <dt>Celular de guardia</dt>
                                    <dd>{sede.celular_guardia || "No disponible"}</dd>

                                    <dt>Correo electrónico</dt>
                                    <dd className="text-break">
                                        {sede.email ? (
                                            <a href={`mailto:${sede.email}`}>
                                                {sede.email}
                                            </a>
                                        ) : (
                                            "No disponible"
                                        )}
                                    </dd>

                                    <dt>Sitio web</dt>
                                    <dd>
                                        {sede.web ? (
                                            <a
                                                href={sede.web}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Visitar sitio oficial
                                                <i
                                                    className="bi bi-box-arrow-up-right ms-2"
                                                    aria-hidden="true"
                                                ></i>
                                            </a>
                                        ) : (
                                            "No disponible"
                                        )}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </section>

                    <section className="col-md-6 col-lg-4">
                        <div className="card h-100 detalle-sede-card">
                            <div className="card-body">
                                <h2 className="h5 fw-semibold mb-4">
                                    <i className="bi bi-clock me-2" aria-hidden="true"></i>
                                    Atención al público
                                </h2>

                                <dl>
                                    {sede.dias_atencion && (
                                        <>
                                            <dt>Días de atención</dt>
                                            <dd>{sede.dias_atencion}</dd>
                                        </>
                                    )}

                                    {sede.horario_atencion && (
                                        <>
                                            <dt>Horario de atención</dt>
                                            <dd>{sede.horario_atencion}</dd>
                                        </>
                                    )}

                                    {sede.atencion_comentario && (
                                        <>
                                            <dt>Información adicional</dt>
                                            <dd>{sede.atencion_comentario}</dd>
                                        </>
                                    )}
                                </dl>
                            </div>
                        </div>
                    </section>

                    <section className="col-12">
                        <div className="card detalle-sede-card">
                            <div className="card-body">
                                <h2 className="h5 fw-semibold mb-3">
                                    <i className="bi bi-globe me-2" aria-hidden="true"></i>
                                    Redes sociales
                                </h2>

                                {sede.redes_sociales?.length > 0 ? (
                                    <ul className="list-unstyled mb-0">
                                        {sede.redes_sociales.map((red, index) => (
                                            <li className="mb-2 text-break" key={index}>
                                                <a
                                                    href={red}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <i
                                                        className="bi bi-link-45deg me-2"
                                                        aria-hidden="true"
                                                    ></i>
                                                    {red}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mb-0 text-secondary">
                                        No hay redes sociales disponibles.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {sede.circunscripcion && (
                    <section className="mt-3">
                        <div className="card detalle-sede-card">
                            <div className="card-body">
                                <h2 className="h5 fw-semibold mb-3">
                                    <i className="bi bi-map me-2" aria-hidden="true"></i>
                                    Circunscripción consular
                                </h2>

                                <p className="mb-0">{sede.circunscripcion}</p>
                            </div>
                        </div>
                    </section>
                )}
            </article>
            <div className="mt-4">
                <BannerColaborar sedeId={sede._id} />
            </div>
        </main>
    )
}
