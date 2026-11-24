
import { Link } from "react-router"
import { useUsuario, useRol } from "../context/session.context"

export default function BannerColaborar({ sedeId }) {
    const usuario = useUsuario()
    const obtenerRol = useRol()

    return (
        <article className="home-colaborar d-flex flex-column flex-md-row align-items-center gap-4">
            <i className="bi bi-megaphone home-colaborar-icono" aria-hidden="true"></i>

            <div className="flex-grow-1">
                <h2 className="h4 fw-bold mb-2">
                    ¿Encontraste un dato incorrecto?
                </h2>

                <p className="text-secondary mb-0">
                    Ayudanos a mantener actualizada la información
                    de las sedes argentinas.
                </p>
            </div>

            {!usuario && (
                <Link to="/login" className="btn btn-primary flex-shrink-0">
                    Iniciá sesión para reportar
                </Link>
            )}

            {usuario && obtenerRol() === "user" && (
                <Link
                    to={sedeId ? `/sedes/${sedeId}/reportar` : "/sedes"}
                    className="btn btn-primary flex-shrink-0"
                >
                    {sedeId ? "Reportar información" : "Explorar sedes"}
                </Link>
            )}

            {usuario && obtenerRol() === "admin" && (
                <Link
                    to={sedeId ? `/admin/sedes/editar/${sedeId}` : "/admin/sedes"}
                    className="btn btn-primary flex-shrink-0"
                >
                    {sedeId ? "Editar sede" : "Administrar sedes"}
                </Link>
            )}
        </article>
    )
}
