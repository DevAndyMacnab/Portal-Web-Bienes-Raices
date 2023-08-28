import {Router} from "express";
import { formularioLogin, formularioRegistro,formularioForgetPassword, registrar,comprobar,
resetPassword,comprobarToken,nuevoPassword,autenticar} from "../controllers/Usuario.controller.js";

const router = Router();

router.get("/login",formularioLogin);
router.post("/login",autenticar);

router.get("/register",formularioRegistro)
router.post("/register",registrar)

router.get("/comprobar/:token",comprobar)

router.get("/forget",formularioForgetPassword)
router.post("/forget",resetPassword)

//Almacena
router.get("/forget/:token",comprobarToken) 
router.post("/forget/:token",nuevoPassword)



export default router;