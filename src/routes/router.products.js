const express = require("express");
const { Router } = express;
const routerProductos = Router();

const multer = require("multer");
const storage = multer({ destinantion: "/upload" });

const checkAuthentication = require("../utils/checkAuthentication");

const {
	getProduct,
	getProductId,
	getProductCategory,
	postProduct,
	putProduct,
	deleteProduct
} = require("../controllers/controller.products");

const productoSubido = storage.fields([
	{
		title: "title",
		thumbnail: "thumbnail",
		price: "price",
		category: "category",
		description: "description",
		stock: "stock"
	}
]);

routerProductos.get("/", getProduct);

// GET trae 1 o todos los productos
routerProductos.get("/:id", getProductId);

routerProductos.get("/category/:category", getProductCategory);

// POST crea 1 producto
routerProductos.post("/", productoSubido, checkAuthentication, postProduct);

// PUT modifica 1 producto
routerProductos.put("/:id", checkAuthentication, putProduct);

// DELETE borra 1 producto
routerProductos.delete("/:id", checkAuthentication, deleteProduct);

module.exports = { routerProductos };
