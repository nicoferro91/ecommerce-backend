const fs = require("fs")

class Carrito {
    constructor(route) {
        this.route = route
    }
    // Crear carrito y devolver su id
    async createCart(){
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            const id = dataParse.length + 1
            const timestamp = Date.now()
            const productos = []
            const newCart = { "id": id, "timestamp": timestamp, "productos": productos }
            dataParse.push(newCart)
            await fs.promises.writeFile(this.route, JSON.stringify(dataParse, null, 2))
            return { msg: `Carrito creado id: ${id}`}
        } catch (error) {
            console.log(error)
        }
    }
    // Borrar carrito por id
    async deleteCart(id){
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            let cart = dataParse.find(cart => cart.id === id)
            if(cart) {
                let dataParseFilter = dataParse.filter(cart => cart.id !== id)
                await fs.promises.writeFile(this.route, JSON.stringify(dataParseFilter, null, 2))
                return { msg: `Carrito borrado id: ${id}`}
            }
            else {
                return { msg: `Carrito id: ${id} no existe`}
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    // Agregar producto al carrito segun id de producto
    async addToCart(idCart, idProd){
        try {
            let carts = await fs.promises.readFile(this.route, "utf8")
            let cartsParse = JSON.parse(carts)
            const cartIndex = cartsParse.findIndex(cart => cart.id === idCart)
            if(cartIndex !== -1) {
                const products = await fs.promises.readFile("./productos.json", "utf8")
                const productsParse = JSON.parse(products) 
                const productIndex = productsParse.findIndex(prod => prod.id === idProd)
                if (productIndex !== -1) {
                    const newProd = productsParse[productIndex]
                    newProd.timestamp = Date.now()
                    cartsParse[cartIndex].productos.push(newProd)
                    await fs.promises.writeFile(this.route, JSON.stringify(cartsParse, null, 2))
                    return { msg: `Producto id: ${idProd} agregado a carrito id: ${idCart}`}
                } else {
                    return { msg: `Producto id: ${idProd} no encontrado`}
                }
            }
            else {
                return { msg: `Carrito id: ${idCart} no existe`}
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Borrar un producto del carrito usando ambos id's
    async deleteFromCart(idCart, idProd){
        try {
            let carts = await fs.promises.readFile(this.route, "utf8")
            let cartsParse = JSON.parse(carts)
            const cartIndex = cartsParse.findIndex(cart => cart.id === idCart)
            if(cartIndex !== -1) {
                const cart = cartsParse[cartIndex]
                const products = cart.productos
                const productIndex = products.findIndex(prod => prod.id === idProd)
                if (productIndex !== -1) {
                    const newProducts = products.filter(prod => prod.id !== idProd)
                    cart.productos = newProducts
                    cartsParse[cartIndex] = cart
                    await fs.promises.writeFile(this.route, JSON.stringify(cartsParse, null, 2))
                    return { msg: `Producto id: ${idProd} borrado de carrito id: ${idCart}`}
                } else {
                    return { msg: `Producto id: ${idProd} no encontrado`}
                }                
            }
            else {
                return { msg: `Carrito id: ${idCart} no existe`}
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Listar productos en un carrito segun su id
    async listCartProducts(idCart){
        try {
            let carts = await fs.promises.readFile(this.route, "utf8")
            let cartsParse = JSON.parse(carts)
            const cartIndex = cartsParse.findIndex(cart => cart.id === idCart)
            if(cartIndex !== -1) {
                const products = cartsParse[cartIndex].productos
                return products
            }
            else {
                return { msg: `Carrito id: ${idCart} no existe`}
            }
        } catch (error) {
            console.log(error)
            
        }
    }
}
module.exports = Carrito