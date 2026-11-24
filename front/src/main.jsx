import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import { SessionProvider } from "./context/session.context.jsx"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.css"
import "./style.css"

import Layout from "./components/Layout.jsx"
import Home from "./pages/Home.jsx"
import Sedes from "./pages/Sedes.jsx"
import DetalleSede from "./pages/DetalleSede.jsx"
import Login from "./pages/auth/Login.jsx"
import Register from "./pages/auth/Register.jsx"
import Logout from "./pages/auth/Logout.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import PublicRoute from "./components/PublicRoute.jsx"
import MisReportes from "./pages/reportes/MisReportes.jsx"
import NuevoReporte from "./pages/reportes/NuevoReporte.jsx"
import EditarReporte from "./pages/reportes/EditarReporte.jsx"
import EliminarReporte from "./pages/reportes/EliminarReporte.jsx"
import Admin from "./pages/Admin.jsx"
import GestionReportes from "./pages/reportes/GestionReportes.jsx"
import DetalleReporte from "./pages/reportes/DetalleReporte.jsx"
import GestionPaises from "./pages/paises/GestionPaises.jsx"
import DetallePais from "./pages/paises/DetallePais.jsx"
import NuevoPais from "./pages/paises/NuevoPais.jsx"
import EditarPais from "./pages/paises/EditarPais.jsx"
import EliminarPais from "./pages/paises/EliminarPais.jsx"
import GestionSedes from "./pages/sedes/GestionSedes.jsx"
import NuevaSede from "./pages/sedes/NuevaSede.jsx"
import EditarSede from "./pages/sedes/EditarSede.jsx"
import EliminarSede from "./pages/sedes/EliminarSede.jsx"
import NotFound from "./pages/NotFound.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/sedes",
        element: <Sedes />
      },
      {
        path: "/sedes/:id",
        element: <DetalleSede />
      },
      {
        path: "/login",
        element: <PublicRoute element={<Login />} />
      },
      {
        path: "/registro",
        element: <PublicRoute element={<Register />} />
      },
      {
        path: "/salir",
        element: <Logout />
      },
      {
        path: "/mis-reportes",
        element: (
            <ProtectedRoute
                element={<MisReportes />}
                rol={["user"]}
            />
        )
      },
      {
        path: "/sedes/:id/reportar",
        element: (
            <ProtectedRoute
                element={<NuevoReporte />}
                rol={["user"]}
            />
        )
      },
      {
        path: "/mis-reportes/editar/:id",
        element: (
            <ProtectedRoute
                element={<EditarReporte />}
                rol={["user"]}
            />
        )
      },
      {
        path: "/mis-reportes/eliminar/:id",
        element: (
            <ProtectedRoute
                element={<EliminarReporte />}
                rol={["user"]}
            />
        )
      },
      {
        path: "/admin",
        element: (
            <ProtectedRoute
                element={<Admin />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/reportes",
        element: (
            <ProtectedRoute
                element={<GestionReportes />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/reportes/:id",
        element: (
            <ProtectedRoute
                element={<DetalleReporte />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/paises",
        element: (
            <ProtectedRoute
                element={<GestionPaises />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/paises/:id",
        element: (
            <ProtectedRoute
                element={<DetallePais />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/paises/nuevo",
        element: (
            <ProtectedRoute
                element={<NuevoPais />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/paises/editar/:id",
        element: (
            <ProtectedRoute
                element={<EditarPais />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/paises/eliminar/:id",
        element: (
            <ProtectedRoute
                element={<EliminarPais />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/sedes",
        element: (
            <ProtectedRoute
                element={<GestionSedes />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/sedes/nueva",
        element: (
            <ProtectedRoute
                element={<NuevaSede />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/sedes/editar/:id",
        element: (
            <ProtectedRoute
                element={<EditarSede />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "/admin/sedes/eliminar/:id",
        element: (
            <ProtectedRoute
                element={<EliminarSede />}
                rol={["admin"]}
            />
        )
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SessionProvider>
            <RouterProvider router={router} />
        </SessionProvider>
    </StrictMode>
)

