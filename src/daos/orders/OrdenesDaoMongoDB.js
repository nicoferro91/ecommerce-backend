const ContenedorMongodb = require("../../contenedores/ContenedorMongoDB.js");
const mongoose = require("mongoose");
const { mongoConnect } = require("../../utils/mongoconnect.js");
const logger = require("../../logs/loggers.js");

const ordenesCollection = "ordenes";

const OrdenesSchema = new mongoose.Schema({
	username: { type: String, required: true, trim: true, unique: true },
	timestamp: { type: String, required: false, trim: true },
	products: { type: Array, required: true },
	address: { type: String, required: false, trim: true }
});

const carritos = mongoose.model(ordenesCollection, OrdenesSchema);

class OrdenesDaoMongoDB extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, carritos);
	}
	async getLastOrder() {
		try {
			let lastOrder = await this.modelo
				.find()
				.limit(1)
				.sort({ orderNumber: -1 });
			if (lastOrder.length == 0) {
				return 0;
			}
			return lastOrder[0].orderNumber;
		} catch (error) {
			console.log("Ocurrio un error: " + error);
		}
	}

	async sendOrder(items, email) {
		console.log(email);
		try {
			let orderNumber = (await this.getLastOrder()) + 1;

			let orderData = {
				items: items,
				orderNumber: orderNumber,
				timestamp: new Date().toLocaleString(),
				state: "generada",
				email: email
			};
			let id = await this.save(orderData);
			return id;
		} catch (error) {
			console.log("Guardando Orden - ocurrio un error: " + error);
		}
	}
}

module.exports = OrdenesDaoMongoDB;
