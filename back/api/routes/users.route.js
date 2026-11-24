import { validateLogin, validateRegister } from "../../middlewares/users.validate.js"
import { validateRol, validateToken } from "../../middlewares/auth.validate.js"
import * as userController from "../controllers/users.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/usuarios",         [validateToken, validateRol(["admin"])],    userController.getUsers)
router.post("/api/usuarios",        [validateRegister],                         userController.saveUsers)
router.post("/api/usuarios/login",  [validateLogin],                            userController.login)

export default router
