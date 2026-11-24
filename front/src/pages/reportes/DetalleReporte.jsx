import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useApiReportes } from "../../services/reportes.service"
import { toast } from "react-toastify"
import EstadoReporte from "../../components/EstadoReporte.jsx"

export default function DetalleReporte() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [reporte, setReporte] = useState(null)
    const [estado, setEstado] = useState("LOADING")
    const [procesando, setProcesando] = useState(false)
    const { getReporteAdminById, resolverReporte } = useApiReportes()
    const nombresCampos = {
        telefono: "Teléfono",
        direccion: "Dirección",
        horarios: "Horarios de atención",
        web: "Página web",
        otro: "Otro dato"
    }

    useEffect(() => {
        getReporteAdminById(id)
            .then(data => {
                setReporte(data)
                setEstado("READY")
            })
            .catch(err => {
                console.error(err)
                setEstado("ERROR")
            })
    }, [id])
    const cambiarEstado = (nuevoEstado) => {
        const confirmar = window.confirm(
            `¿Estás seguro de que querés marcar este reporte como ${nuevoEstado}?`
        )
        if (!confirmar) {
            return
        }
        setProcesando(true)
        resolverReporte(id, nuevoEstado)
            .then(() => {
                toast.success(
                    nuevoEstado === "aprobado"
                        ? "Reporte aprobado correctamente"
                        : "Reporte rechazado correctamente"
                )

                navigate("/admin/reportes")
            })
            .catch(err => {
                console.error(err)
                toast.error("No se pudo actualizar el estado del reporte")
            })
            .finally(() => {
                setProcesando(false)
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
                <Link to="/admin/reportes">
                    Volver a gestionar reportes
                </Link>
            </main>
        )
    }

    return (
        <main className="container py-5">
            <Link
                to="/admin/reportes"
                className="btn btn-outline-secondary mb-4"
            >
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Volver a reportes
            </Link>

            <h1>Revisar reporte</h1>

            <div className="card shadow-sm mt-4">
                <div className="card-body">
                    <h2 className="h4">{reporte.sedeNombre}</h2>

                    <p>
                        <strong>Dato reportado:</strong>{" "}
                        {nombresCampos[reporte.campo]}
                    </p>

                    <p>
                        <strong>Descripción:</strong>{" "}
                        {reporte.descripcion}
                    </p>

                    <p>
                        <strong>Corrección propuesta:</strong>{" "}
                        {reporte.valorPropuesto || "Sin propuesta"}
                    </p>

                    <p>
                        <strong>Estado:</strong> <EstadoReporte estado={reporte.estado} />
                    </p>
                    
                    <p>
                        <strong>Reportado por:</strong> {reporte.usuarioNombre}
                    </p>

                    <Link
                        to={`/sedes/${reporte.sedeId}`}
                        className="btn btn-primary mb-4"
                    >
                        Ver información de la sede
                    </Link>

                    
                    <div className="border-top pt-4">
                        <p className="text-secondary">
                            Verificá la información antes de resolver el reporte.
                            Cambiar su estado no modifica automáticamente los datos de la sede.
                        </p>

                        <div className="d-flex gap-2 flex-wrap">
                            {reporte.estado !== "aprobado" && (
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    disabled={procesando}
                                    onClick={() => cambiarEstado("aprobado")}
                                >
                                    Aprobar reporte
                                </button>
                            )}

                            {reporte.estado !== "rechazado" && (
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    disabled={procesando}
                                    onClick={() => cambiarEstado("rechazado")}
                                >
                                    Rechazar reporte
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
