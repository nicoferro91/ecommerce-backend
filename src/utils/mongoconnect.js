const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "../.env" });
const logger = require("../logs/loggers");

const mongoConnect = async () => {
	try {
		const url = process.env.MONGODB_URL;
		mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.info("MongoDb conectado");
	} catch (error) {
		logger.error(`Error de conexion: ${error}`);
	}
};

module.exports = mongoConnect;
