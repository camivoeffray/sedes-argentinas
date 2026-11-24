import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useApiPaises } from "../../services/paises.service"
import Paginacion from "../../components/Paginacion"

export default function GestionPaises() {
    const [paises, setPaises] = useState([])
    const [pagina, setPagina] = useState(1)
    const [estado, setEstado] = useState("LOADING")
    const { getPaisesPaginados } = useApiPaises()
    useEffect(() => {
        setEstado("LOADING")

        getPaisesPaginados(pagina)
            .then(data => {
                setPaises(data)
                setEstado("READY")
            })
            .catch(error => {
                console.error(error)
                setEstado("ERROR")
            })
    }, [pagina])
    if (estado === "LOADING") {
        return (
            <main className="container py-5">
                <p>Cargando países...</p>
            </main>
        )
    }

    if (estado === "ERROR") {
        return (
            <main className="container py-5">
                <p className="alert alert-danger" role="alert">
                    No pudimos cargar los países.
                </p>
            </main>
        )
    }

    return (
        <main className="container py-5">
            <Link to="/admin" className="btn btn-outline-secondary mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Volver al panel
            </Link>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Gestionar países</h1>
                <Link to="/admin/paises/nuevo" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
                    Nuevo país
                </Link>
            </div>

            {paises.length === 0 ? (
                <p>No hay países registrados.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Imagen</th>
                                <th scope="col">País</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paises.map(pais => (
                                <tr key={pais._id}>
                                    <td>
                                        <img
                                            src={pais.foto}
                                            alt=""
                                            width="80"
                                            className="rounded"
                                        />
                                    </td>
                                    <td>{pais.nombre}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link
                                                to={`/admin/paises/${pais._id}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                Ver
                                            </Link>
                                            <Link
                                                to={`/admin/paises/editar/${pais._id}`}
                                                className="btn btn-outline-secondary btn-sm"
                                            >
                                                Editar
                                            </Link>

                                            <Link
                                                to={`/admin/paises/eliminar/${pais._id}`}
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
                    <Paginacion
                        pagina={pagina}
                        anterior={() => setPagina(pagina - 1)}
                        siguiente={() => setPagina(pagina + 1)}
                        haySiguiente={paises.length === 12}
                    />
                </div> 
            )}
        </main>
    )
}
