import { Request, Response, request } from 'express'
import Product from '../models/Product.model'
import server from '../server'

//Obtener los productos
export const getProducts = async(req: Request, res: Response)=> {
    try {
        const product = await Product.findAll({
            order: [
                ['price', 'desc']
            ],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        return res.json({data: product})
    
    } catch (error) {
        console.log(error)
    }
}

//Obtener el producto por el id
export const getProductById = async(req: Request, res: Response)=> {
    try {
        
        const { id } = req.params
        const product = await Product.findByPk(id)

        //Existe el producto
        if(!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        
        return res.json({data: product})
       
    } catch (error) {
        console.log(error)
    }
}

//Crear el producto
export const createProduct = async (req : Request, res: Response) => {

    try {
        const product = await Product.create(req.body)
        return res.status(201).json({data: product, msg: 'Se agregaron los datos' })
    } catch (error) {
        console.log(error)
    }
}

//Actualizar el producto
export const updateProduct = async (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const product = await Product.findByPk(id)

        //Existe el producto
        if(!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        //Actualizar
        await product.update(req.body)
        await product.save()

        return res.json({data: product})

    } catch (error) {
        console.log(error)    
    }
}

//Actualizar disponibilidad
export const updateAvailability = async (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const product = await Product.findByPk(id)

        //Existe el producto
        if(!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        //Actualizar
        product.availability = !product.dataValues.availability
        await product.save()
        return res.json({data: product})

    } catch (error) {
        console.log(error)
    
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const product = await Product.findByPk(id)

        //Existe el producto
        if(!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        //Eliminar
        await product.destroy()
        return res.json({msg: 'Producto Eliminado', data: product})
    } catch (error) {
        console.log(error)
    }
}


