const fs = require("fs")

class Contenedor {
    constructor(route) {
        this.route = route
    }
    // Devolver todos los productos
    async getAll() {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            if (dataParse.length) {
                return Promise.resolve(dataParse)
            } else {
                console.log("No hay productos")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Devolver un producto por id
    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            id = parseInt(id)
            let product = dataParse.find(product => product.id === id)
            if (product) {
                return product
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Actualizar un producto por id
    async updateById(product, id, admin) {
        if (admin) {
            try {
                let data = await fs.promises.readFile(this.route, "utf8")
                let dataParse = JSON.parse(data)
                const productIndex = dataParse.findIndex(prod => prod.id === id)
                if (productIndex !== -1) {
                    product.id = id
                    dataParse[productIndex] = product
                    await fs.promises.writeFile(this.route, JSON.stringify(dataParse, null, 2))
                    return { msg: `Producto actualizado id: ${id}` }
                } else {
                    return { error: 'Producto no encontrado' }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            return { error: "-1", descripcion: `Ruta /productos/:${id} metodo PUT no autorizada` }
        }
    }
    // Agregar un producto
    async save(product, admin) {
        if (admin) {
            try {
                let id
                let data = await fs.promises.readFile(this.route, "utf8")
                let dataParse = JSON.parse(data)
                if (dataParse.length) {
                    id = dataParse.length + 1
                    await fs.promises.writeFile(this.route, JSON.stringify([...dataParse, { ...product, id: id }], null, 2))
                } else {
                    id = 1
                    await fs.promises.writeFile(this.route, JSON.stringify([{ ...product, id: 1 }], null, 2))
                }
                return { msg: `Producto agregado id: ${id}` }
            } catch (error) {
                console.log(error)
            }
        } else {
            return { error: "-1", descripcion: `Ruta /productos/ metodo POST no autorizada` }
        }
    }
    // Borrar un producto por id
    async deleteById(id, admin) {
        if (admin) {
            try {
                let data = await fs.promises.readFile(this.route, "utf8")
                let dataParse = JSON.parse(data)
                let product = dataParse.find(product => product.id === id)
                if (product) {
                    let dataParseFilter = dataParse.filter(product => product.id !== id)
                    await fs.promises.writeFile(this.route, JSON.stringify(dataParseFilter, null, 2))
                    return { msg: `El producto id: ${id} fue borrado` }
                } else {
                    return { msg: `El producto id: ${id} no existe` }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            return { error: "-1", descripcion: `Ruta /productos/:${id} metodo DELETE no autorizada` }
        }
    }
    // Borrar todos los productos
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.route, JSON.stringify([], null, 2))
            console.log("Borrados todos los productos")
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Contenedor