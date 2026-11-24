import { Router } from "express"
import * as sedesController from "../controllers/sedes.controller.js"
import { validateToken, validateRol } from "../../middlewares/auth.validate.js"
import { validateSede } from "../../middlewares/sedes.validate.js"

const router = Router()

router.get("/api/sedes", sedesController.getSedes)
router.get("/api/sedes/:id", sedesController.getSedeById)

router.post("/api/sedes", [validateToken, validateRol(["admin"]), validateSede], sedesController.saveSede)
router.patch("/api/sedes/:id", [validateToken, validateRol(["admin"]), validateSede], sedesController.updateSede)
router.delete("/api/sedes/:id", [validateToken, validateRol(["admin"])], sedesController.deleteSede)

export default router
