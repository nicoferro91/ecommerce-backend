const ContenedorMongodb = require("../../contenedores/ContenedorMongoDB.js");
const mongoose = require("mongoose");
const { mongoConnect } = require("../../utils/mongoconnect.js");
const logger = require("../../logs/loggers.js");

const carritosCollection = "carritos";

const CarritosSchema = new mongoose.Schema({
	username: { type: String, required: true, trim: true, unique: true },
	timestamp: { type: String, required: false, trim: true },
	products: { type: Array, required: true },
	address: { type: String, required: false, trim: true }
});

const carritos = mongoose.model(carritosCollection, CarritosSchema);

class CarritoDaoMongoDb extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, carritos);
	}
	async addProductToCart(idCart, product) {
		try {
			let cartById = await this.getById(idCart);
			let timestamp = Date.now();
			if (cartById) {
				cartById.products.push(product);

				await this.modelo.updateOne(
					{ id: idCart },
					{ $set: { products: cartById.products } }
				);
				return cartById;
			} else {
				return [];
			}
		} catch (error) {
			logger.error(error);
		}
	}

	async deleteProductById(idCart, idProduct) {
		try {
			let cart = await this.getById(idCart);

			logger.info(`Carrito Seleccionado: ${cart}`);
			logger.info(`Productos: ${cart.products}`);
			if (cart) {
				let filteredProducts = cart.products.filter(
					product => product._id !== idProduct
				);
				cart.products = filteredProducts;
				console.log(cart.products);
				await this.updateById(idCart, cart);
				logger.info("Producto Eliminado");
			} else {
				logger.info("No se encontró el Producto");
			}
		} catch (error) {
			logger.error(error);
		}
	}

	async getByEmail(username) {
		try {
			let cart = await this.modelo.find({ username: username });
			if (cart) {
				return cart[0];
			} else {
				return null;
			}
		} catch (error) {
			logger.error(error);
		}
	}
}

module.exports = CarritoDaoMongoDb;
