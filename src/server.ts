import express from "express";
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import router from "./router";
import { db } from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate(); // Autenticarse a la base de datos
        await db.sync(); // Sincroniza con los modelos. 
        console.log(colors.blue('Conexión exitosa a la base de datos'));
    } catch (error) {
        console.log(colors.bgRed.white('Hubo un error al conectar en la DB'));
    }
}

connectDB()

// Instancia de express
const server = express();

// Permitir cors
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL){
            callback(null, true) //Permite la conexión
            console.log('Se permitio la conexión')
        } else {
            callback(new Error('Error de cors'))
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formulario
server.use(express.json());

//Morgan -- Da más detalles acerca de las llamadas a la API
server.use(morgan('dev'))

// ROUTING -------------------------------
server.use('/api/products', router);

//Docs ----------------------------
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;
