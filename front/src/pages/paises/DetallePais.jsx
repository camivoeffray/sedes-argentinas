import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { useApiPaises } from "../../services/paises.service"

export default function DetallePais() {
    const { id } = useParams()

    const [pais, setPais] = useState(null)
    const [estado, setEstado] = useState("LOADING")

    const { getPaisById } = useApiPaises()

    useEffect(() => {
        getPaisById(id)
            .then(data => {
                setPais(data)
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
                to="/admin/paises"
                className="btn btn-outline-secondary mb-4"
            >
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Volver a países
            </Link>

            <div className="row g-4">
                <div className="col-md-5">
                    <img
                        src={pais.foto}
                        alt={`Imagen representativa de ${pais.nombre}`}
                        className="img-fluid rounded"
                    />
                </div>

                <div className="col-md-7">
                    <h1>{pais.nombre}</h1>

                    <h2 className="h5 mt-4">Descripción</h2>
                    <p>{pais.descripcion}</p>

                    <div className="d-flex gap-2 flex-wrap mt-4">
                        <Link
                            to={`/admin/paises/editar/${pais._id}`}
                            className="btn btn-primary"
                        >
                            <i className="bi bi-pencil me-2" aria-hidden="true"></i>
                            Editar país
                        </Link>

                        <Link
                            to={`/admin/paises/eliminar/${pais._id}`}
                            className="btn btn-outline-danger"
                        >
                            <i className="bi bi-trash me-2" aria-hidden="true"></i>
                            Eliminar país
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
