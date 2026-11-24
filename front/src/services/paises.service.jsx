import { call } from "./api.service"

export function useApiPaises() {
    const getPaises = () => call("/paises")
    const getPaisesPaginados = (page = 1) => call("/paises?page=" + page + "&limit=12")
    const getPaisById = (id) => call("/paises/" + id)
    const getSedesByPais = (id) => call("/paises/" + id + "/sedes")
    const createPais = (pais) => call("/paises", "POST", pais)
    const updatePais = (id, pais) => call("/paises/" + id, "PATCH", pais)
    const deletePais = (id) => call("/paises/" + id, "DELETE")

    return {
        getPaises,
        getPaisesPaginados,
        getPaisById,
        getSedesByPais,
        createPais,
        updatePais,
        deletePais
    }
}
