import { Router } from "express";
import { ProductManager } from "../productmanager.js";

const productManager = new ProductManager ('productos.txt')

const productRouter = Router()

productRouter.get("/", async (req,res) => {
    try{
        const products = await productManager.getProducts()
        res.send(products)
    }catch{
        res.send (error)
    }
    
})


productRouter.get('/:id', async (req, res) => {
    const product = await productManager.getProductById(req.params.id)
    res.render('product', {
        title: product.title,
        description: product.description,
        price: product.price,
        code: product.code,
        stock: product.stock //esto es para handlebars
    })
    //res.send(product) esto es para postman
 
})

productRouter.post('/', async (req,res) => {
    const {title, description, price, thumbnail, status, code, stock} = req.body
     await productManager.addProduct({title, description, price, thumbnail, status, code, stock})
    // req.io.emit("mensaje", "Hola")
    res.send("Producto creado")
})

productRouter.put('/', async (req,res) => {
    const id = req.params.id
    const {title, description, price, thumbnail, status, code, stock} = req.body
    const mensaje = await productManager.updateProduct(id,{title, description, price, thumbnail, status, code, stock})
    res.send(mensaje)
})

productRouter.delete('/', async (req,res) => {
    const id = req.params.id
    const mensaje = await productManager.deleteProduct(id)
    res.send(mensaje)
})

export default productRouter