import { Navigate } from "react-router"
import { useUsuario, useRol } from "../context/session.context"

export default function ProtectedRoute({ element, rol }) {
    const usuario = useUsuario()
    const obtenerRol = useRol()

    if (!usuario) {
        return <Navigate to="/login" />
    }
    if (rol.includes(obtenerRol())) {
        return element
    }
    return <Navigate to="/" />
}
