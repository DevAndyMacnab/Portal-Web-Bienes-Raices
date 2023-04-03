import {Router} from "express";
import { formularioLogin, formularioRegistro,formularioForgetPassword, registrar,comprobar,
resetPassword} from "../controllers/Usuario.controller.js";

const router = Router();

router.get("/login",formularioLogin);

router.get("/register",formularioRegistro)
router.post("/register",registrar)

router.get("/comprobar/:token",comprobar)

router.get("/forget",formularioForgetPassword)
router.post("/forget",resetPassword)




export default router;