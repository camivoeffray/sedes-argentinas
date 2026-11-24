import { Activity, useContext, useState } from "react"
import { Link, NavLink } from "react-router"
import { contexto, useRol } from "../context/session.context"
import logo from "../assets/logosedes.svg"

export default function Navbar() {
    const auth = useContext(contexto)
    const obtenerRol = useRol()
    const [menuAbierto, setMenuAbierto] = useState(false)

    const cerrarMenu = () => setMenuAbierto(false)

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-sedes">
            <div className="container">
                <Link
                    className="navbar-brand d-flex align-items-center gap-2"
                    to="/"
                    onClick={cerrarMenu}
                >
                    <img
                        src={logo}
                        alt="Logo de la marca"
                        width="60"
                        height="60"
                    />
                    <span className="fw-bold">Sedes Argentinas</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="menuPrincipal"
                    aria-expanded={menuAbierto}
                    aria-label="Abrir o cerrar menú"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    id="menuPrincipal"
                    className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
                >
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end onClick={cerrarMenu}>
                                Inicio
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/sedes" onClick={cerrarMenu}>
                                Explorar sedes
                            </NavLink>
                        </li>

                        <Activity mode={auth?.usuario && obtenerRol() === "user" ? "visible" : "hidden"}>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/mis-reportes" onClick={cerrarMenu}>
                                    Mis reportes
                                </NavLink>
                            </li>
                        </Activity>

                        <Activity mode={auth?.usuario && obtenerRol() === "admin" ? "visible" : "hidden"}>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin" onClick={cerrarMenu}>
                                    Administración
                                </NavLink>
                            </li>
                        </Activity>

                        <Activity mode={auth?.usuario ? "visible" : "hidden"}>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/salir" onClick={cerrarMenu}>
                                    Cerrar sesión
                                </NavLink>
                            </li>
                        </Activity>

                        <Activity mode={!auth?.usuario ? "visible" : "hidden"}>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login" onClick={cerrarMenu}>
                                    Iniciar sesión
                                </NavLink>
                            </li>
                        </Activity>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
