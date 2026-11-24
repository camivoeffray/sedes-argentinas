import { Activity, useContext } from "react"
import { Link } from "react-router"
import { contexto, useRol } from "../context/session.context"
import logo from "../assets/logosedes-blanco.svg"

export default function Footer() {
    const auth = useContext(contexto)
    const obtenerRol = useRol()

    return (
        <footer className="footer-sedes mt-auto">
            <div className="container pt-5 pb-3">
                <div className="row gy-4">
                    <div className="col-12 col-md-6">
                        <Link to="/" className="footer-marca d-inline-flex align-items-center gap-3 mb-3">
                            <img
                                src={logo}
                                alt=""
                                width="60"
                                height="60"
                            />
                            <span className="fw-bold fs-5">Sedes Argentinas</span>
                        </Link>

                        <p className="footer-descripcion mb-0">
                            Encontrá información sobre embajadas y consulados
                            argentinos en el exterior.
                        </p>
                    </div>

                    <div className="col-6 col-md-3">
                        <h2 className="h6 fw-bold mb-3">Navegación</h2>

                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                            <li>
                                <Link to="/">Inicio</Link>
                            </li>
                            <li>
                                <Link to="/sedes">Explorar sedes</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3">
                        <h2 className="h6 fw-bold mb-3">Mi cuenta</h2>

                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                            <Activity mode={auth?.usuario && obtenerRol() === "user" ? "visible" : "hidden"}>
                                <li>
                                    <Link to="/mis-reportes">Mis reportes</Link>
                                </li>
                            </Activity>

                            <Activity mode={auth?.usuario && obtenerRol() === "admin" ? "visible" : "hidden"}>
                                <li>
                                    <Link to="/admin">Administración</Link>
                                </li>
                            </Activity>

                            <Activity mode={auth?.usuario ? "visible" : "hidden"}>
                                <li>
                                    <Link to="/salir">Cerrar sesión</Link>
                                </li>
                            </Activity>

                            <Activity mode={!auth?.usuario ? "visible" : "hidden"}>
                                <li>
                                    <Link to="/login">Iniciar sesión</Link>
                                </li>
                                <li>
                                    <Link to="/registro">Registrarse</Link>
                                </li>
                            </Activity>
                        </ul>
                    </div>
                </div>

                <div className="footer-inferior mt-5 pt-3 text-center">
                    <p className="mb-0">
                        © {new Date().getFullYear()} Sedes Argentinas. Proyecto académico.
                    </p>
                </div>
            </div>
        </footer>
    )
}
