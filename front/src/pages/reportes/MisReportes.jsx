import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useApiReportes } from "../../services/reportes.service"
import EstadoReporte from "../../components/EstadoReporte.jsx"

export default function MisReportes() {
    const [reportes, setReportes] = useState([])
    const [estado, setEstado] = useState("LOADING")
    const { getMisReportes } = useApiReportes()
    const fetchApi = async () => {
        setEstado("LOADING")

        try {
            const data = await getMisReportes()
            setReportes(data)
            setEstado("READY")
        } catch (error) {
            console.error(error)
            setEstado("ERROR")
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    const nombresCampos = {
        telefono: "Teléfono",
        direccion: "Dirección",
        horarios: "Horarios de atención",
        web: "Página web",
        otro: "Otro dato"
    }

    return (
        <main className="container py-5">
            <h1>Mis reportes</h1>

            <p className="fs-6">
                Consultá el estado de los reportes que enviaste
                para ayudar a mantener actualizada la información consular.
                Sólo podrás editar tus reportes mientras se encuentren en estado pendiente.
            </p>              
        
            {estado === "LOADING" && (
                <p>Cargando reportes...</p>
            )}

            {estado === "ERROR" && (
                <p className="alert alert-danger" role="alert">
                    No pudimos cargar tus reportes.
                </p>
            )}

            {estado === "READY" && (
                <>
                    {reportes.length === 0 ? (
                        <div className="alert alert-info">
                            <p>Todavía no tenés reportes activos.</p>
                            <Link to="/sedes" className="btn btn-primary">
                                Explorar sedes
                            </Link>
                        </div>
                    ) : (
                        <div className="row g-3 my-4">
                            {reportes.map(reporte => (
                                <div className="col-md-6" key={reporte._id}>
                                    <article className="card h-100">
                                        <div className="card-body">
                                            <h2 className="h5">
                                                {reporte.sedeNombre}
                                            </h2>

                                            <p className="text-secondary">
                                                Reporte sobre {nombresCampos[reporte.campo]}
                                            </p>

                                            <p>
                                                <strong>Reportaste: </strong>
                                                {reporte.descripcion}
                                            </p>

                                            {reporte.valorPropuesto && (
                                                <p>
                                                    <strong>Corrección propuesta: </strong>
                                                    {reporte.valorPropuesto}
                                                </p>
                                            )}

                                            <p>
                                                <strong>Estado: </strong><EstadoReporte estado={reporte.estado} />
                                            </p>

                                            <Link
                                                to={`/sedes/${reporte.sedeId}`}
                                                className="btn btn-primary"
                                            >
                                                Ver sede
                                            </Link>
                                            {reporte.estado === "pendiente" && (
                                                <Link
                                                    to={`/mis-reportes/editar/${reporte._id}`}
                                                    className="btn btn-outline-secondary ms-2"
                                                >
                                                    <i className="bi bi-pencil me-2" aria-hidden="true"></i>
                                                    Editar reporte
                                                </Link>
                                            )}
                                                <Link
                                                    to={`/mis-reportes/eliminar/${reporte._id}`}
                                                    className="btn btn-outline-danger ms-2"
                                                >
                                                    <i className="bi bi-trash me-2" aria-hidden="true"></i>
                                                    Retirar reporte
                                                </Link>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </main>
    )
}
