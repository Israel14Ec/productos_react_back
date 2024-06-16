import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config() //Llamamos a las variables de entorno

export const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
        models: [__dirname + '/../models/**/*'],
        logging: false
    }

)