import { Link } from "react-router"

export default function SedeCard({ sede }) {
    return (
        <article className="card sede-card h-100">
            <img
                src={sede.img}
                className="card-img-top sede-imagen"
                alt={`Imagen ilustrativa de ${sede.nombre}`}
            />
            <div className="card-body d-flex flex-column">
                <p className="sede-pais mb-2">{sede.pais}</p>
                <h2 className="card-title h5 fw-bold">{sede.nombre}</h2>

                <p className="text-secondary mb-2">
                    <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
                    {sede.ciudad}
                </p>

                <p className="mb-4">
                    <span className="sede-tipo">{sede.tipo}</span>
                </p>

                <Link
                    to={`/sedes/${sede._id}`}
                    className="btn btn-primary mt-auto"
                >
                    Ver información
                </Link>
            </div>
        </article>
    )
}
