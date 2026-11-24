import { Link } from "react-router"

export default function Admin() {
    return (
        <main className="container py-5">
            <h1>Panel de administración</h1>
            <p className="text-secondary mb-4">
                Gestioná la información de Sedes Argentinas.
            </p>

            <section className="row g-4">
                <article className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <i className="bi bi-clipboard-check fs-2" aria-hidden="true"></i>
                            <h2 className="h5 mt-3">Gestionar reportes</h2>
                            <p className="card-text">
                                Revisá los reportes enviados por los usuarios.
                            </p>
                            <Link to="/admin/reportes" className="btn btn-primary">
                                Ver reportes
                            </Link>
                        </div>
                    </div>
                </article>

                <article className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <i className="bi bi-globe-americas fs-2" aria-hidden="true"></i>
                            <h2 className="h5 mt-3">Gestionar países</h2>
                            <p className="card-text">
                                Agregá, editá o eliminá países del directorio.
                            </p>
                            <Link to="/admin/paises" className="btn btn-primary">
                                Ver países
                            </Link>
                        </div>
                    </div>
                </article>

                <article className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <i className="bi bi-building fs-2" aria-hidden="true"></i>
                            <h2 className="h5 mt-3">Gestionar sedes</h2>
                            <p className="card-text">
                                Administrá los datos de embajadas y consulados.
                            </p>
                            <Link to="/admin/sedes" className="btn btn-primary">
                                Ver sedes
                            </Link>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}
