const ContenedorMongodb = require("../../contenedores/ContenedorMongoDB.js");
const mongoose = require("mongoose");
const { mongoConnect } = require("../../utils/mongoconnect.js");

const chatCollection = "chat";

const ChatSchema = new mongoose.Schema({
	fecha: { type: Date, default: Date.now, require: true },
	mail: { type: String, require: true },
	msg: { type: String, require: true }
});

const chats = mongoose.model(chatCollection, ChatSchema);
class ChatDaoMongodb extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, chats);
	}
}

module.exports = ChatDaoMongodb;
