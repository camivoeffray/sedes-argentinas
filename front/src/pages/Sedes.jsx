import { useEffect, useState } from "react"
import { useApiSedes } from "../services/sedes.service"
import { useApiPaises } from "../services/paises.service"
import SedeCard from "../components/SedeCard.jsx"
import Paginacion from "../components/Paginacion"

export default function Sedes() {
    const [sedes, setSedes] = useState([])
    const [paises, setPaises] = useState([])
    const [paisSeleccionado, setPaisSeleccionado] = useState("")
    const [pagina, setPagina] = useState(1)
    const [estado, setEstado] = useState("LOADING")

    const { getSedes } = useApiSedes()
    const { getPaises } = useApiPaises()

    useEffect(() => {
        getPaises()
            .then(data => setPaises(data))
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        setEstado("LOADING")

        getSedes(paisSeleccionado, pagina)
            .then(data => {
                setSedes(data)
                setEstado("READY")
            })
            .catch(error => {
                console.error(error)
                setEstado("ERROR")
            })
    }, [paisSeleccionado, pagina])

    const cambiarPais = (event) => {
        setPaisSeleccionado(event.target.value)
        setPagina(1)
    }

    return (
        <main className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3">Explorá las sedes argentinas</h1>

                <p className="lead text-secondary">
                    Encontrá embajadas y consulados argentinos
                    en distintos países del mundo.
                </p>
            </div>

            <div className="row justify-content-center mb-5">
                <div className="col-12 col-md-6 col-lg-4">
                    <label htmlFor="filtro-pais" className="form-label fw-semibold">
                        Filtrar por país
                    </label>

                    <select
                        id="filtro-pais"
                        className="form-select filtro-sedes"
                        value={paisSeleccionado}
                        onChange={cambiarPais}
                    >
                        <option value="">Todos los países</option>

                        {paises.map(pais => (
                            <option
                                key={pais._id}
                                value={pais.nombre}
                            >
                                {pais.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {estado === "LOADING" && (
                <p className="text-center">Cargando sedes...</p>
            )}

            {estado === "ERROR" && (
                <p className="alert alert-danger" role="alert">
                    No se pudieron cargar las sedes.
                </p>
            )}

            {estado === "READY" && (
                <>
                    {sedes.length === 0 ? (
                        <p className="text-center text-secondary">
                            No se encontraron sedes.
                        </p>
                    ) : (
                        <div className="row g-4">
                            {sedes.map(sede => (
                                <div
                                    className="col-md-6 col-lg-4"
                                    key={sede._id}
                                >
                                    <SedeCard sede={sede} />
                                </div>
                            ))}
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
