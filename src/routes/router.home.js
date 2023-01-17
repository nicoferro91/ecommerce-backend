const express = require("express");
const { Router } = express;
const routerHome = Router();

const { Producto } = require("../daos/index.js");

const Productos = new Producto();

const checkAuthentication = require("../utils/checkAuthentication");

routerHome.get("/", checkAuthentication, async (req, res) => {
	const productos = await Productos.getAll();
	res.render("index", {
		titulo: "Productos disponibles",
		list: productos,
		listExist: true,
		productos: true,
		username: req.session.passport.user.username,
	});
});

module.exports = { routerHome };
