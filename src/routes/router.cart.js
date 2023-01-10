const express = require("express");
const { Router } = express;
const routerCarrito = Router();

const {
	postCartId,
	deleteCartId,
	getProductsFromCart,
	postProductToCart,
	deleteProductFromCart,
	getCartByEmail
} = require("../controllers/controller.carts");

// --------- POST: Crea un carrito y devuelve su ID --------
routerCarrito.post("/", postCartId);

// --------- DELETE: Borra un carrito completo por ID -------
routerCarrito.delete("/:id", deleteCartId);

// GET lista de productos de 1 carrito
routerCarrito.get("/:id/productos", getProductsFromCart);

// POST guardar 1 producto en 1 carrito
routerCarrito.post("/:id/productos/:idProd", postProductToCart);

// DELETE borra 1 producto de 1 carrito
routerCarrito.delete("/:clientId/productos/:idProd", deleteProductFromCart);

routerCarrito.get("/:emailId", getCartByEmail);

module.exports = { routerCarrito };
