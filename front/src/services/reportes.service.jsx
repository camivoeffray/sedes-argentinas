import { call } from "./api.service"

export function useApiReportes() {
    const getMisReportes = () => call("/reportes/mis-reportes")
    const getReportes = () => call("/reportes")
    const getReporteById = (id) => call("/reportes/" + id)
    const getReporteAdminById = (id) => call("/admin/reportes/" + id)
    const createReporte = (reporte) => call("/reportes", "POST", reporte)
    const updateReporte = (id, reporte) => call("/reportes/" + id, "PATCH", reporte)
    const deleteReporte = (id) => call("/reportes/" + id, "DELETE")
    const resolverReporte = (id, estado) => call("/reportes/" + id + "/estado", "PATCH", { estado })

    return {
        getMisReportes,
        getReportes,
        getReporteById,
        getReporteAdminById,
        createReporte,
        updateReporte,
        deleteReporte,
        resolverReporte
    }
}
