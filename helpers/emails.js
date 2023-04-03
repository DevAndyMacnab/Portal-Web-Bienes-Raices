import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const {nombre,email,token} =datos
    console.log(datos)
    await transport.sendMail({
        from:"Bienes Raices.com",
        to:email,
        subject:"Confirma tu cuenta en BienesRaice.com",
        text:"Confirma tu cuenta en BienesRaice.com",
        html:`
        <p>Hola ${nombre}, comprueba tu cuenta en bienesRaices.com</p>
        <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/api/comprobar/${token}">Confirmar cuenta</a></p>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`
        
    })

}

export const emailForgetPassword = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const {nombre,email,token} =datos
    console.log(datos)
    await transport.sendMail({
        from:"Bienes Raices.com",
        to:email,
        subject:"Confirma tu cuenta en BienesRaice.com",
        text:"Confirma tu cuenta en BienesRaice.com",
        html:`
        <p>Hola ${nombre}, comprueba tu cuenta en bienesRaices.com</p>
        <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/api/comprobar/${token}">Confirmar cuenta</a></p>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`
        
    })

}