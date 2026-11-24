import { Outlet } from "react-router"
import { ToastContainer, Bounce } from "react-toastify"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"

export default function Layout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick={false}
                pauseOnHover
                draggable
                theme="light"
                transition={Bounce}
            />

            <Navbar />

            <div className="flex-grow-1">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}
