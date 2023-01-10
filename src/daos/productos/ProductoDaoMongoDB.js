const ContenedorMongodb = require("../../contenedores/ContenedorMongoDB.js");
const mongoose = require("mongoose");
const { mongoConnect } = require("../../utils/mongoconnect.js");

const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
	title: { type: String, require: true },
	thumbnail: { type: String, require: true },
	price: { type: Number, require: true },
	category: { type: String, require: true },
	description: { type: String, require: true },
	stock: { type: Number, require: true }
});

const productos = mongoose.model(productosCollection, ProductosSchema);

class ProductosDaoMongodb extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, productos);
	}
	async getByCategory(category) {
		let productos = await this.getAll();

		try {
			const prodFiltrado = productos.filter(prod => prod.category === category);
			return prodFiltrado;
		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = ProductosDaoMongodb;
