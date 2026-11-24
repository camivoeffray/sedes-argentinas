import { useEffect } from "react"
import { Navigate } from "react-router"
import { useLogout } from "../../context/session.context"

export default function Logout() {
    const logout = useLogout()
    useEffect(() => {
        logout()
    }, [])
    return <Navigate to="/login" />
}
