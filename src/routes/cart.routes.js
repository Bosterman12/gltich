import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartmanager = new CartManager ('carrito.txt')

const cartRouter = Router()


cartRouter.get('/:id', async (req, res) => {
    const cart = await cartmanager.getCartById(req.params.id)
    res.send(cart)
    
})

cartRouter.post('/:idCart', async (req,res) => {
    const cart = await cartmanager.createCarrito()
    res.send("carrito creado")
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
      const cid = req.params.cid
      const pid = req.params.pid
      const { quantity } = req.body
  
      const cart = await cartmanager.addProductCart(cid, pid, { quantity })
    } catch (err) {
      console.log(err)
    }
    res.send('Producto agregdo al carrito')
  })
  

/*cartRouter.post('/', async (req,res) => {
    
    const {idCart, id, cantidad} = req.body
    const mensaje = await cartmanager.addProductCart(idCart,{id, cantidad})
    res.send(mensaje)
})*/



export default cartRouter