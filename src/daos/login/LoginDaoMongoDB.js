const mongoose = require("mongoose");
const ContenedorMongodb = require("../../contenedores/ContenedorMongoDB.js");
const mongoConnect = require("../../utils/mongoconnect.js");

const loginsCollections = "logins";

const LoginSchema = new mongoose.Schema({
	username: { type: String, require: true, unique: true },
	password: { type: String, require: true },
	fullName: { type: String, require: true },
	age: { type: Number, require: true },
	phone: { type: Number, require: true },
	address: { type: String, require: true },
	img: { type: String, require: true }
});

const logins = mongoose.model(loginsCollections, LoginSchema);

class LoginDaoMongoDB extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, logins);
	}

	// getByMail
	async getByUser(username) {
		const doc = await this.modelo.findOne({ username });
		if (!doc) return null; //si no hay nada null
		// retornar el objeto completo
		return doc;
	}
}

module.exports = LoginDaoMongoDB;
