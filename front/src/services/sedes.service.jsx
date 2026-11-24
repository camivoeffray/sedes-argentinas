import { call } from "./api.service"

export function useApiSedes() {
    const getSedes = (pais = "", page = 1) => {
        let uri = "/sedes?page=" + page + "&limit=12"
        if (pais) {
            uri += "&pais=" + encodeURIComponent(pais)
        }
        return call(uri)
    }
    const getSedeById = (id) => call("/sedes/" + id)
    const createSede = (sede) => call("/sedes", "POST", sede)
    const updateSede = (id, sede) => call("/sedes/" + id, "PATCH", sede)
    const deleteSede = (id) => call("/sedes/" + id, "DELETE")

    return {
        getSedes,
        getSedeById,
        createSede,
        updateSede,
        deleteSede
    }
}
