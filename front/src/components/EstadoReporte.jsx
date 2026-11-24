export default function EstadoReporte({ estado }) {
    const estilos = {
        pendiente: "text-bg-warning",
        aprobado: "text-bg-success",
        rechazado: "text-bg-danger"
    }

    return (
        <span className={`badge rounded-pill ${estilos[estado] || "text-bg-secondary"}`}>
            {estado}
        </span>
    )
}
