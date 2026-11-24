import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useApiPaises } from "../../services/paises.service"
import { toast } from "react-toastify"

export default function EliminarPais() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pais, setPais] = useState(null)
    const [estado, setEstado] = useState("LOADING")
    const [eliminando, setEliminando] = useState(false)
    const { getPaisById, deletePais } = useApiPaises()

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
    const handleEliminar = (e) => {
        e.preventDefault()
        setEliminando(true)

        deletePais(id)
            .then(() => {
                toast.success("País eliminado correctamente")
                navigate("/admin/paises")
            })
            .catch(err => {
                console.error(err)
                toast.error("No se pudo eliminar el país")
                setEliminando(false)
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
                    Volver a países
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
                <h1 className="h3 mb-4">Eliminar país</h1>

                <p>¿Estás seguro de que querés eliminar este país?</p>

                <h2 className="h5">{pais.nombre}</h2>

                <img
                    src={pais.foto}
                    alt={`Imagen representativa de ${pais.nombre}`}
                    className="img-fluid rounded mb-3"
                    style={{ maxWidth: "250px" }}
                />

                <p>{pais.descripcion}</p>

                <div className="alert alert-warning" role="alert">
                    Al eliminar este país, sus sedes dejarán de aparecer
                    en el directorio público.
                </div>
                <form onSubmit={handleEliminar}>
                    <div className="d-flex gap-2 flex-wrap justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-outline-danger"
                            disabled={eliminando}
                        >
                            Sí, eliminar país
                        </button>
                        <Link
                            to="/admin/paises"
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
