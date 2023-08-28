import jwt from 'jsonwebtoken'

//Funcion para generar un json web token de la informacion que pase el usuario al loguearse
export const generarJwt=datos=>jwt.sign({id:datos.id,  nombre:datos.nombre},process.env.JWT_SECRET,
    {expiresIn:"1d"})

//Funcion para generar un id aleatorio
export const generarId=()=> Date.now().toString(32) + Math.random().toString(32).substring(2);