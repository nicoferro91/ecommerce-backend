const Contenedor = require("./contenedor");
const Carrito = require("./carrito")

const express = require("express")
const { Router } = express

const app = express()
const PORT = 8080
const routerProductos = Router()
const routerCarrito = Router()

// Seteo de administrador, se chequea dentro de contenedor
const admin = true

// Funciones middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))

app.use("/api/productos", routerProductos)

app.use("/api/carrito", routerCarrito)

app.get("/", (req,res) =>{
    res.send("hola mundo")
})

app.listen(PORT, () =>{
    console.log("servidor en puerto 8080")
})

// Devolver todos los productos
routerProductos.get("/", async (req,res)=>{
    const contenedor = new Contenedor("./productos.json")
    const respuesta = await contenedor.getAll()
    res.json({respuesta})
})

// Devolver un producto por id
routerProductos.get("/:id", async (req,res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const contenedor = new Contenedor("./productos.json")
    const respuesta = await contenedor.getById(id)
    res.json({respuesta})
})

// Actualizar un producto por id
routerProductos.put("/:id", async(req, res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const objProducto = req.body
    const contenedor = new Contenedor("./productos.json")
    const respuesta = await contenedor.updateById(objProducto, id, admin)
    res.json({respuesta})
} )

// Agregar un producto
routerProductos.post("/", async (req, res)=>{
    const contenedor = new Contenedor("./productos.json")
    const objProducto = req.body
    const respuesta = await contenedor.save(objProducto, admin)
    res.json({respuesta})
})

// Borrar un producto por id
routerProductos.delete("/:id", async (req,res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const contenedor = new Contenedor("./productos.json")
    const respuesta = await contenedor.deleteById(id, admin)
    res.json({respuesta})
})

// Carrito:

// Crear carrito y devolver su id
routerCarrito.post("/", async (req, res)=>{
    const carrito = new Carrito("./carritos.json")
    const respuesta = await carrito.createCart()
    res.json({respuesta})
})

// Borrar carrito por id
routerCarrito.delete("/:id", async (req, res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const carrito = new Carrito("./carritos.json")
    const respuesta = await carrito.deleteCart(id)
    res.json({respuesta})
})

// Agregar producto al carrito segun id de producto
routerCarrito.post("/:id/productos/:id_prod", async (req, res)=>{
    const url = req.params
    const idCart = parseInt(url.id.slice(1))
    const idProd = parseInt(url.id_prod.slice(1))
    const carrito = new Carrito("./carritos.json")
    const respuesta = await carrito.addToCart(idCart, idProd)
    res.json({respuesta})
})

// Borrar un producto del carrito usando ambos id's
routerCarrito.delete("/:id/productos/:id_prod", async (req, res)=>{

})

// Listar productos en un carrito segun su id
routerCarrito.get("/:id/productos", async (req, res)=>{

})