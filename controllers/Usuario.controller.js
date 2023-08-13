import { check, validationResult } from "express-validator"
import Usuario from "../models/Usuario.js"
import { generarId } from "../helpers/tokens.js"
import { emailRegistro, emailForgetPassword } from "../helpers/emails.js"

export const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina: "Iniciar Sesión"

    })
}

export const formularioRegistro = (req, res) => {
    console.log(req.csrfToken())
    res.render("auth/register", {
        pagina: "Crear Cuenta",
        csrfToken: req.csrfToken()
    })
}


export const registrar = async (req, res) => {
    //Validacion de datos ingresados por el usuario
    await check('nombre').notEmpty().withMessage("Debes ingresar algun nombre válido").run(req)
    await check('email').isEmail().withMessage("Debes ingresar algun Email válido").run(req)
    await check("password", "repetir_password").isLength({ min: 6 }).withMessage("Su contraseña es demasiado débil")
        .equals(req.body.repetir_password).withMessage("Ambas contraseñas deben ser iguales").run(req)
    let resultado = validationResult(req)


    //Verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        return res.render("auth/register", {
            pagina: "Crear Cuenta",
            errores: resultado.array(),
            csrfToken: req.csrfToken(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            }
        })
    }

    const { nombre, email, password } = req.body
    const existeUsuario = await Usuario.findOne({ where: { email } })
    if (existeUsuario) {
        return res.render("auth/register", {
            pagina: "Crear Cuenta",
            csrfToken: req.csrfToken(),
            errores: [{ msg: "El usuario ya se encuentra registrado" }],
            usuario: {
                nombre,
                email
            }
        })
    }

    //Aca se crea el usuario nuevo en caso se aprueben las validaciones
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })

    //Envia email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token

    })


    //Mostrando un mensaje de confirmacion
    res.render("templates/mensaje", {
        pagina: "Cuenta creada correctamente",
        mensaje: "Porfavor, no olvides confirmar tu cuenta en el correo que ingresaste"
    })
}

//Funcion que comprueba la cuenta
export const comprobar = async (req, res) => {
    const { token } = req.params
    //Verificar si el token es valido
    const usuario = await Usuario.findOne({ where: { token } })
    if (!usuario) {
        return res.render("auth/confirmar-cuenta", {
            pagina: "Error al confirmar tu cuenta",
            mensaje: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
            error: true
        })
    }

    //Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    return res.render("auth/confirmar-cuenta", {
        pagina: "Cuenta Confirmada",
        mensaje: "La cuenta se confirmó correctamente",
        error: false
    })
}

export const formularioForgetPassword = (req, res) => {
    res.render("auth/forgetPassword", {
        pagina: "Olvidé mi Constraseña",
        csrfToken: req.csrfToken()
    })

}
export const resetPassword = async (req, res) => {
    await check('email').isEmail().withMessage("Debes ingresar algun Email válido").run(req)
    
    let resultado = validationResult(req)
    //Verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        return res.render("auth/forgetPassword", {
            pagina: "Olvidé mi Constraseña",
            errores: resultado.array(),
            csrfToken: req.csrfToken(),
            
        })
    }
    //Buscar al usuario
    const {email}=req.body

    const usuario = await Usuario.findOne({where:{ email}})
    if (!usuario) {
        return res.render("auth/forgetPassword", {
            pagina: "Olvidé mi Constraseña",
            errores: [{msg:"El Email no pertenece a ningun usuario"}],
            csrfToken: req.csrfToken(),
            
        })}

        //Generar un token y enviar el email
        usuario.token=generarId()
        await usuario.save();

        //Enviar email
        emailForgetPassword({
            nombre:usuario.nombre,
            email:usuario.email,
            token:usuario.token
        })

        res.render("templates/mensaje", {
            pagina: "Restablece tu contraseña",
            mensaje: "Hemos enviado un email con las instrucciones"
        })
        
        

        //Renderizar un mensaje
}
export const comprobarToken =async(req,res) =>{
        const{token}=req.params;
        const usuario = await Usuario.findOne({where:{token}})
        if(!usuario){
            return res.render("auth/confirmar-cuenta", {
                pagina: "Error del token",
                mensaje: "Hubo un error al validar tu informacion",
                error: true
            })
        }
        //Mostrar un formulario para modificar password
        res.render("auth/reset-password",{
            pagina:"Restablece tu constraseña",
            csrfToken:req.csrfToken(),
            
        })

}
export const nuevoPassword=async(req,res)=>{
    console.log("Esta es la funcion de nuevo password") 

} 