import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useApiSedes } from "../../services/sedes.service"
import Paginacion from "../../components/Paginacion"

export default function GestionSedes() {
    const [sedes, setSedes] = useState([])
    const [pagina, setPagina] = useState(1)
    const [estado, setEstado] = useState("LOADING")

    const { getSedes } = useApiSedes()

    useEffect(() => {
        setEstado("LOADING")

        getSedes("", pagina)
            .then(data => {
                setSedes(data)
                setEstado("READY")
            })
            .catch(error => {
                console.error(error)
                setEstado("ERROR")
            })
    }, [pagina])

    return (
        <main className="container py-5">
            <Link to="/admin" className="btn btn-outline-secondary mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Volver al panel
            </Link>

            <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
                <h1>Gestionar sedes</h1>

                <Link to="/admin/sedes/nueva" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
                    Nueva sede
                </Link>
            </div>

            {estado === "LOADING" && <p>Cargando sedes...</p>}

            {estado === "ERROR" && (
                <p className="alert alert-danger" role="alert">
                    No se pudieron cargar las sedes.
                </p>
            )}

            {estado === "READY" && (
                <>
                    {sedes.length === 0 ? (
                        <p>No hay sedes para mostrar.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Sede</th>
                                        <th scope="col">País</th>
                                        <th scope="col">Ciudad</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {sedes.map(sede => (
                                        <tr key={sede._id}>
                                            <td>{sede.nombre}</td>
                                            <td>{sede.paisInfo?.nombre || sede.pais}</td>
                                            <td>{sede.ciudad}</td>
                                            <td>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    <Link
                                                        to={`/sedes/${sede._id}`}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Ver
                                                    </Link>

                                                    <Link
                                                        to={`/admin/sedes/editar/${sede._id}`}
                                                        className="btn btn-outline-secondary btn-sm"
                                                    >
                                                        Editar
                                                    </Link>

                                                    <Link
                                                        to={`/admin/sedes/eliminar/${sede._id}`}
                                                        className="btn btn-outline-danger btn-sm"
                                                    >
                                                        Eliminar
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <Paginacion
                        pagina={pagina}
                        anterior={() => setPagina(pagina - 1)}
                        siguiente={() => setPagina(pagina + 1)}
                        haySiguiente={sedes.length === 12}
                    />
                </>
            )}
        </main>
    )
}
