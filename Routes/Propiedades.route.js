import express from "express";
import {admin} from "../controllers/Propiedad.controller.js"

 
const propiedadesRoute= express.Router();

propiedadesRoute.get("/mis-propiedades",admin)

export default propiedadesRoute