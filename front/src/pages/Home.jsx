import { Link } from "react-router"
import BannerColaborar from "../components/BannerColaborar.jsx"

export default function Home() {
    return (
        <main>
            <section className="home-hero d-flex align-items-center">
                <div className="container">
                    <div className="home-hero-contenido">
                        <h1 className="display-5 fw-bold mb-3 text-white">
                            Sedes Argentinas
                        </h1>

                        <p className="lead mb-4">
                            Encontrá embajadas y consulados argentinos
                            en distintos países del mundo, y colaborá
                            para que podamos mantener actualizada la
                            información.
                        </p>

                        <Link to="/sedes" className="btn btn-info fw-semibold px-4 py-2">
                            <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
                            Explorar sedes
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container py-5 text-center">
                <h2 className="visually-hidden">Información que podés encontrar</h2>
                <p className="h3 fw-bold mb-3">
                    ¿Estás viviendo afuera?
                </p>

                <p className="text-secondary mb-5">
                    Te acompañamos con la información que necesitás sobre las representaciones
                    argentinas en el exterior.
                </p>

                <div className="row g-4">
                    <div className="col-md-4">
                        <i className="bi bi-geo-alt home-icono" aria-hidden="true"></i>
                        <h3 className="h5 fw-bold mt-3">Directorio de sedes</h3>
                        <p className="text-secondary small">
                            Encontrá embajadas y consulados argentinos alrededor del mundo.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <i className="bi bi-info-circle home-icono" aria-hidden="true"></i>
                        <h3 className="h5 fw-bold mt-3">Información útil</h3>
                        <p className="text-secondary small">
                            Accedé a datos de contacto, ubicación y horarios de atención.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <i className="bi bi-people home-icono" aria-hidden="true"></i>
                        <h3 className="h5 fw-bold mt-3">Colaboración ciudadana</h3>
                        <p className="text-secondary small">
                            Ayudanos a mantener la información actualizada.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container pb-5">
                <BannerColaborar />
            </div>
        </main>
    )
}
