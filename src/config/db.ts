import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config() //Llamamos a las variables de entorno


export const db = new Sequelize(process.env.EXTERNAL_DB_URL!, {
    dialectOptions: {
        ssl:{
            require: false
        }
    },
    models: [__dirname + '/../models/**/*'],
    logging: false
})
