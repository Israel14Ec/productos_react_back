import { exit } from 'node:process'
import { db } from '../config/db'

//Limpio despues de hacer las pruebas
const clearDB = async () => {
    try {
        await db.sync({ force: true}) //Elimina los datos de la db
        console.log('Datos eliminados correctamente')
        exit() //Finaliza el programa

    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === '--clear') { //process es de node, argv es un arreglo
    clearDB()
}
