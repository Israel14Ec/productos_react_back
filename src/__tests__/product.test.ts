import request from 'supertest'
import server, { connectDB } from '../server'
import { db } from '../config/db'

describe('POST /api/products', () => {

    //verificar la validación de que no haya campos nulos
    it('should display validation erros', async () => {
        const response = await request(server).post('/api/products').send({
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(201)
        expect(response.body.errors).not.toHaveLength(2)

    } )


    //Verificar que no haya precios negativos
    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor curvo',
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(201)
        expect(response.body.errors).not.toHaveLength(2)

    } )

    //Verificar la creación
    it('Should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            "name": "Mouse - Testing",
            "price": "50"
        })


        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data') //Que tenga la propiedad de data

        expect(response.status).not.toBe(500)
        expect(response.body).not.toHaveProperty('errors') //Que tenga la propiedad de data

    })
})

//Get para productos
describe(' GET /api/products', () => {

    //Comprobar que exista la URL
    it('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    //Comprobar los resultados del get
    it('GET a JSON response with products', async () => {

        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        //Lo que no se espera
        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })
})

//Buscar por el id
describe(' GET /api/products/:id', () => {

    it('should return a 404 response for a non-existing product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should check a valid ID in the URL', async() => {
        const response = await request(server).get(`/api/products/not-valid-url`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')

    })

    it('GET a JSON response for a product id', async() => {
        const response = await request(server).get(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

//Actualizar
describe(' PUT /api/products/:id', () => {

    it('should check a valid ID in the URL', async() => {
        const response = await request(server)
                                .put(`/api/products/not-valid-url`)
                                .send({
                                    "name": "Monitor",
                                    "availability": true,
                                    "price": 50
                                })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')

    })


    it('should display validation error messages when update', async () => {
        const response = await request(server).put(`/api/products/1`).send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
        

    }) 

    it('should display validation price', async () => {
        const response = await request(server).put(`/api/products/1`).send({
            "name": "Monitor",
            "availability": true,
            "price": -300
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
        

    }) 


    it('should return a 404 response for a non-existing product', async () => {
        const productId = 2000

        const response = await request(server).put(`/api/products/${productId}`).send({
            "name": "Monitor Update",
            "availability": true,
            "price": 300
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Producto no encontrado")
        
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
        

    }) 
    
    it('should update a product with date validated', async () => {
  
        const response = await request(server).put(`/api/products/1`).send({
            "name": "Monitor Update",
            "availability": true,
            "price": 300
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
        

    }) 


})

describe('PATCH /api/products/:id', () => {
    it('should returna 404 response for a non-existing product', async () => {
        const productId = 200
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })    

    it('should update the product availability', async () => {
        const response = await request(server).patch(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})

//Eliminar
describe('DELETE /api/products/:id', () => {
    it('Should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')

    })

    it('Should return a 404 for no exist product id', async () => {
        const productId = 200

        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
        
    })

    it('Should delete a product by id', async () => {
        const productId = 1

        const response = await request(server).delete(`/api/products/${productId}`)
       
        expect(response.status).toBe(200)
        expect(response.body.msg).toBe('Producto Eliminado')

        expect(response.status).not.toBe(400)
        
    })
})


//Simulación de falla del server para conectar la base de datos

/*
jest.mock('../config/db') //Simula la conexión en la basede datos


describe('ConnectDB', () => {
    it('should handle database conecction error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar en la DB')) //Fuerza la excepcion
            const consoleSpy = jest.spyOn(console, 'log')

            await connectDB()

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Hubo un error al conectar en la DB')
            )

    })

})*/