import { Navigate } from "react-router"
import { useUsuario } from "../context/session.context"

export default function PublicRoute({ element }) {
    const usuario = useUsuario()

    if (usuario) {
        return <Navigate to="/" replace />
    }

    return element
}