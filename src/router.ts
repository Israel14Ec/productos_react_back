import { Router } from "express" //Instancia del router
import { body, param } from 'express-validator'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      Product: 
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name: 
 *                  type: string
 *                  description: The product name
 *                  example: Monitor curvo de 29 pulgadas
 *              price:  
 *                  type: number
 *                  description: The product price
 *                  example: 300
 *              Available:  
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 *          
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Obtiene una lista de productos
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *                              
 * 
 */

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Return a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor curvo"
 *               price:
 *                 type: number
 *                 example: 3.99
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - invalid input data
 */


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto por el usuario
 *     tags: 
 *       - Products
 *     description: Retorna la actualización del producto
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor curvo"
 *               price:
 *                 type: number
 *                 example: 3.99
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Product Not Found
 */


/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: update Product availability
 *     tags:
 *       - Products
 *     description: Devuelve la actualización de availability (disponibilidad)
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Product Not Found
 */

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags: 
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

//Obtener todo
router.get('/', getProducts)

//Obtenr por el id
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
) //Routing dinámico


//Crear
router.post('/',
    //Validación en el router
    body('name').notEmpty().withMessage('EL nombre del Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('EL nombre del Producto no puede ir vacio') //valido que no este vacio
        .custom(value => value > 0).withMessage('El valor no puede ser negativo'),
    handleInputErrors,
    createProduct //Llama a la función
)

//actualizar
router.put('/:id', 
param('id').isInt().withMessage('ID no valido'),
body('name').notEmpty().withMessage('EL nombre del Producto no puede ir vacio'),
   
body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('EL nombre del Producto no puede ir vacio') //valido que no este vacio
    .custom(value => value > 0).withMessage('El valor no puede ser negativo'),
body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no válido'),
handleInputErrors,
updateProduct) //Realiza modificacionses totales


//Actualizar disponibilidad
router.patch('/:id',    
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)



export default router

