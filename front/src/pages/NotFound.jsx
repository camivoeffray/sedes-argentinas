import { Link } from "react-router"

export default function NotFound() {
    return (
        <main className="container py-5 text-center">
            <div className="py-5">
                <p className="display-1 fw-bold">404</p>

                <h1 className="h4 fw-bold mb-3">
                    Página no encontrada
                </h1>

                <p className="text-secondary mb-4">
                    La página que buscás no existe o cambió de dirección.
                </p>

                <Link to="/" className="btn btn-primary">
                    <i className="bi bi-house me-2" aria-hidden="true"></i>
                    Volver al inicio
                </Link>
            </div>
        </main>
    )
}
