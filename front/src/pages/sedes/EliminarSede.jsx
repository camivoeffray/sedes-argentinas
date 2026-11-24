import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useApiSedes } from "../../services/sedes.service"

export default function EliminarSede() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [sede, setSede] = useState(null)
    const [estado, setEstado] = useState("LOADING")
    const [error, setError] = useState("")
    const [eliminando, setEliminando] = useState(false)

    const { getSedeById, deleteSede } = useApiSedes()

    useEffect(() => {
        getSedeById(id)
            .then(data => {
                setSede(data)
                setEstado("READY")
            })
            .catch(err => {
                console.error(err)
                setEstado("ERROR")
            })
    }, [id])

    const handleEliminar = (e) => {
        e.preventDefault()
        setError("")
        setEliminando(true)

        deleteSede(id)
            .then(() => navigate("/admin/sedes"))
            .catch(err => {
                console.error(err)
                setError("No se pudo eliminar la sede.")
                setEliminando(false)
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

            <div
                className="card shadow-sm p-4 mx-auto"
                style={{ maxWidth: "650px" }}
            >
                <h1 className="h3 mb-4">Eliminar sede</h1>

                <p>¿Estás seguro de que querés eliminar esta sede?</p>

                <h2 className="h5">{sede.nombre}</h2>

                <p>
                    <strong>País:</strong> {sede.paisInfo?.nombre || sede.pais}
                </p>

                <p>
                    <strong>Ciudad:</strong> {sede.ciudad}
                </p>

                <p>
                    <strong>Dirección:</strong> {sede.direccion}
                </p>

                <div className="alert alert-warning" role="alert">
                    Esta sede dejará de aparecer en el directorio público.
                    Su registro se conservará en la base de datos.
                </div>

                {error && (
                    <p className="alert alert-danger" role="alert">
                        {error}
                    </p>
                )}

                <form onSubmit={handleEliminar}>
                    <div className="d-flex gap-2 flex-wrap justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-outline-danger"
                            disabled={eliminando}
                        >
                            Sí, eliminar sede
                        </button>

                        <Link
                            to="/admin/sedes"
                            className="btn btn-outline-secondary"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}
