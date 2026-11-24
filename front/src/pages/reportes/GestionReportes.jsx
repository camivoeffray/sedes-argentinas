import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useApiReportes } from "../../services/reportes.service"
import EstadoReporte from "../../components/EstadoReporte.jsx"

export default function GestionReportes() {
    const [reportes, setReportes] = useState([])
    const [estado, setEstado] = useState("LOADING")

    const { getReportes } = useApiReportes()

    const nombresCampos = {
        telefono: "Teléfono",
        direccion: "Dirección",
        horarios: "Horarios de atención",
        web: "Página web",
        otro: "Otro dato"
    }

    useEffect(() => {
        getReportes()
            .then(data => {
                setReportes(data)
                setEstado("READY")
            })
            .catch(error => {
                console.error(error)
                setEstado("ERROR")
            })
    }, [])

    if (estado === "LOADING") {
        return (
            <main className="container py-5">
                <p>Cargando reportes...</p>
            </main>
        )
    }

    if (estado === "ERROR") {
        return (
            <main className="container py-5">
                <p className="alert alert-danger" role="alert">
                    No se pudieron cargar los reportes.
                </p>
            </main>
        )
    }

    return (
        <main className="container py-5">
            <h1>Gestionar reportes</h1>
            <p className="text-secondary">
                Revisá los reportes enviados por los usuarios, y marcalos como aprobados
                o rechazados según corresponda. Tendrás que corregir manualmente los datos de las sedes que hayas
                corroborado a partir de los reportes.
            </p>

            {reportes.length === 0 ? (
                <p>No hay reportes para mostrar.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Sede</th>
                                <th scope="col">Reportado por</th>
                                <th scope="col">Dato reportado</th>
                                <th scope="col">Corrección propuesta</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reportes.map(reporte => (
                                <tr key={reporte._id}>
                                    <td>{reporte.sedeNombre}</td>
                                    <td>{reporte.usuarioNombre}</td>
                                    <td>{nombresCampos[reporte.campo]}</td>
                                    <td>{reporte.valorPropuesto || "Sin propuesta"}</td>
                                    <td><EstadoReporte estado={reporte.estado} /></td>
                                    <td>
                                        
                                    <Link
                                        to={`/admin/reportes/${reporte._id}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Revisar reporte
                                    </Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    )
}
