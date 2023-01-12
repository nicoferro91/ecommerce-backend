const express = require("express");
const { Router } = express;
const routerChat = Router();

const {
	getChat,
	getChatId,
	deleteChatId
} = require("../controllers/controller.chats");

const checkAuthentication = require("../utils/checkAuthentication");

routerChat.get("/chat", checkAuthentication, getChat);

routerChat.get("/chat/:id", checkAuthentication, getChatId);

routerChat.delete("/chat/:id", checkAuthentication, deleteChatId);

module.exports = { routerChat };
