const express = require("express");
const {
	getOrders,
	getOrderById,
	postSendOrder,
	putOrder,
	deleteOrderById
} = require("../controllers/controller.orders.js");

const { Router } = express;
const routerOrden = Router();

//********************** GET (Devuelve todos los productos) **********************************
routerOrden.get("/", getOrders);

//********************** GET (Devuelve un producto según ID) **********************************
routerOrden.get("/:id", getOrderById);

//************************ POST (Recibe y Agrega un producto) **********************************
routerOrden.post("/", postSendOrder);

//************************ PUT (Recibe y Actualiza un producto según su ID) ***********************
routerOrden.put("/:id", putOrder);

//************************ DELETE (Elimina un producto según su ID) ***********************
routerOrden.delete("/:id", deleteOrderById);

module.exports = { routerOrden };
