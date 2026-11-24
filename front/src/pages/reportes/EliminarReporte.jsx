import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { useApiReportes } from "../../services/reportes.service"
import { toast } from "react-toastify"

export default function EliminarReporte() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [reporte, setReporte] = useState(null)
    const [estado, setEstado] = useState("LOADING")
    const { getReporteById, deleteReporte } = useApiReportes()

    useEffect(() => {
        getReporteById(id)
            .then(data => {
                setReporte(data)
                setEstado("READY")
            })
            .catch(err => {
                console.error(err)
                setEstado("ERROR")
            })
    }, [id])
    const handleEliminar = (e) => {
        e.preventDefault()
        deleteReporte(id)
            .then(() => {
                toast.success("Reporte retirado correctamente")
                navigate("/mis-reportes")
            })
            .catch(err => {
                console.error(err)
                toast.error("No se pudo retirar el reporte")
            })
    }
    if (estado === "LOADING") {
        return (
            <main className="container py-5">
                <p>Cargando reporte...</p>
            </main>
        )
    }

    if (estado === "ERROR") {
        return (
            <main className="container py-5">
                <p className="alert alert-danger" role="alert">
                    No se pudo obtener el reporte.
                </p>
                <Link to="/mis-reportes">Volver a mis reportes</Link>
            </main>
        )
    }

    return (
        <main className="container py-5">
            <div className="card p-4 mx-auto" style={{ maxWidth: "650px" }}>
                <h1 className="h3">Retirar reporte</h1>
                        <p> ¿Estás seguro de que querés retirar este reporte?
                            Dejará de aparecer en tu listado, pero su registro en nuestra
                            base de datos se conservará.</p>
                        <p>
                            <strong>Sede:</strong> {reporte.sedeNombre || "Sede no disponible"}
                        </p>

                        <p>
                            <strong>Descripción:</strong> {reporte.descripcion}
                        </p>

                        <form onSubmit={handleEliminar}>
                            <button type="submit" className="btn btn-outline-danger d-block ms-auto">
                                Sí, retirar reporte
                            </button>
                        </form>
                <Link
                    to="/mis-reportes"
                    className="btn btn-outline-secondary mt-3"
                >
                    Cancelar
                </Link>
            </div>
        </main>
    )
}
