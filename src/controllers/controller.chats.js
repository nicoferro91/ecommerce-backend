const { Chat } = require("../daos/index.js");
const Chats = new Chat();

// note deja entrar si no estás loggeado
const getChat = async (req, res) => {
	const chats = await Chats.getAll();
	res.render("chat", { chats });
};

const getChatId = async (req, res) => {
	const { id } = req.params;
	const chatById = await Chats.getById(id);
	chatById ? res.json(chatById) : res.json({ error: "Mensaje no encontrado" });
};

const deleteChatId = async (req, res) => {
	const { id } = req.params;
	res.json(await Chats.deleteById(id));
	return (texts = await leerComentarios.getAll());
};

module.exports = { getChat, getChatId, deleteChatId };
