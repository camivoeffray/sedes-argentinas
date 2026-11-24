import { Router } from "express"
import * as paisesController from "../controllers/paises.controller.js"
import { validateToken, validateRol } from "../../middlewares/auth.validate.js"
import { validatePais } from "../../middlewares/paises.validate.js"

const router = Router()

router.get("/api/paises", paisesController.getPaises)
router.get("/api/paises/:id", paisesController.getPaisById)
router.get("/api/paises/:id/sedes", paisesController.getSedesByPais)
router.post("/api/paises", [validateToken, validateRol(["admin"]), validatePais], paisesController.savePais)
router.patch("/api/paises/:id", [validateToken, validateRol(["admin"]), validatePais], paisesController.editarPais)
router.delete("/api/paises/:id", [validateToken, validateRol(["admin"])], paisesController.eliminarPais)



//router.patch("/api/paises/:id/sedes", paisesController.actualizarSedesPais) --> para agregar un país a las sedes que ya existen y corresponden al mismo.
//router.patch("/api/paises/sedes/actualizar", paisesController.actualizarTodasLasSedes) --> para migrar todos los países a las sedes que ya existían.

export default router
