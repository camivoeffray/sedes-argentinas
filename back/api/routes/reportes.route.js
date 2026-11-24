import { Router } from "express"
import * as reportesController from "../controllers/reportes.controller.js"
import { validateToken, validateRol } from "../../middlewares/auth.validate.js"
import { validateReporte, validateEdicionReporte, validateEstadoReporte } from "../../middlewares/reportes.validate.js"

const router = Router()

router.get("/api/reportes/mis-reportes", [validateToken, validateRol(["user"])], reportesController.getMisReportes)
router.get("/api/reportes/:id", [validateToken, validateRol(["user"])], reportesController.getReporteById)
router.get("/api/reportes", [validateToken, validateRol(["admin"])], reportesController.getReportes)
router.get("/api/admin/reportes/:id", [validateToken, validateRol(["admin"])], reportesController.getReporteAdminById)
router.post("/api/reportes", [validateToken, validateRol(["user"]), validateReporte], reportesController.saveReporte)
router.patch("/api/reportes/:id", [validateToken, validateRol(["user"]), validateEdicionReporte], reportesController.editarReporte)
router.patch("/api/reportes/:id/estado", [validateToken, validateRol(["admin"]), validateEstadoReporte], reportesController.resolverReporte)
router.delete("/api/reportes/:id", [validateToken, validateRol(["user"])], reportesController.eliminarReporte)

export default router
