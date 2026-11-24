export default function Paginacion({ pagina, anterior, siguiente, haySiguiente }) {
    return (
        <nav aria-label="Paginación">
            <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
                <button
                    type="button"
                    className="btn paginacion-btn"
                    disabled={pagina === 1}
                    onClick={anterior}
                    aria-label="Página anterior"
                >
                    <i className="bi bi-chevron-left" aria-hidden="true"></i>
                </button>

                <span className="paginacion-texto">
                    Página {pagina}
                </span>

                <button
                    type="button"
                    className="btn paginacion-btn"
                    disabled={!haySiguiente}
                    onClick={siguiente}
                    aria-label="Página siguiente"
                >
                    <i className="bi bi-chevron-right" aria-hidden="true"></i>
                </button>
            </div>
        </nav>
    )
}
