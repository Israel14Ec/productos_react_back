//Pruebas unitarias con jest, ejecuta solo el código

/*
describe('Primer test', () => {
    test('Debe revisar la suma de 1 + 1', () => {
        expect(1 + 1).toBe(2)
    })

    test('Debe revisar que la suma de 1 + 1 no sea 3', () => {
        expect(1 + 1).not.toBe(2)
    })
})
*/

//Pruebas de la APIs con supertest
/*
import request from "supertest"
import server from "../server"

describe('GET /api', () => {
    it('Should send back a json response', async () => {
        const res = await request(server).get('/api')
        
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('desde api')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('Desde api')
        
        //console.log(res.text) //Contenido de la ruta
        //console.log(res.body.msg) //contenido del json
    })
})
*/