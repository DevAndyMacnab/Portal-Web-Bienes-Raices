import Sequelize from "sequelize"
import dotenv from "dotenv"
dotenv.config({path:".env"})


const db = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USUARIO,process.env.BD_PASSWORD,{
    host: process.env.BD_HOST,
    port:process.env.DB_PORT,
    dialect:"mysql",
    define: {
        timestamps: true
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorAliases: false

})
export default db;