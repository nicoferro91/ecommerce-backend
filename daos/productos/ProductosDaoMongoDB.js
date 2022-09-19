const Contenedor = require("../../contenedores/contenedorMongodb.js")
const mongoose = require("mongoose")
const { mongoConnect } = require("../../mongoDB/connection.js")

const productosCollection = "productos"

const ProductosSchema = new mongoose.Schema({
	title: { type: String, require: true },
	thumbnail: { type: String, require: true },
	price: { type: Number, require: true },
	stock: { type: Number, require: true }
});

const productos = mongoose.model(productosCollection, ProductosSchema)

class ProductosDaoMongodb extends Contenedor {
	constructor() {
		super(mongoConnect, productos)
	}
}

module.exports = ProductosDaoMongodb