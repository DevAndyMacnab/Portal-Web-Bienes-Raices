import express from "express";
import csrf from "csurf"
import cookieParser from "cookie-parser";
import router from "./Routes/Usuario.route.js";
import db from "./config/db.js";
import dotenv from "dotenv"
dotenv.config({path:".env"})

const app = express();
app.use(express.urlencoded({extended:true}))
try {
    await db.authenticate();
    db.sync()
    console.log("Authentication successful")
} catch (error) {
    console.log(error);
    
}
const port = process.env.PORT || 3000

//Middlewares
app.set("view engine", "pug")
app.set("views","./views")

//Habilitamos cookie parser
app.use(cookieParser())
//Habilitamos el CSRF
app.use(csrf({cookie:true}))

//Carpeta publica
app.use(express.static("public"))
app.use("/api",router)


app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})