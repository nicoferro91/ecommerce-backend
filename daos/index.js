require("dotenv").config();

const CarritoDaoArchivo = require("./carrito/CarritoDaoArchivo.js");
const CarritoDaoFirebase = require("./carrito/CarritoDaoFirebase.js");
const CarritoDaoMongoDB = require("./carrito/CarritoDaoMongoDB.js");

const ProductoDaoArchivo = require("./productos/ProductoDaoArchivo.js");
const ProductoDaoMongoDB = require("./productos/ProductoDaoMongoDB.js");
const ProductoDaoFirebase = require("./productos/ProductoDaoFirebase.js");

// Exportamos segun la variable DAO del .env

if (process.env.DAO === "fs") {
	exports.Carrito = CarritoDaoArchivo
	exports.Producto = ProductoDaoArchivo
} else if (process.env.DAO === "mongo") {
	exports.Carrito = CarritoDaoMongoDB
	exports.Producto = ProductoDaoMongoDB
} else if (process.env.DAO === "firebase") {
	exports.Carrito = CarritoDaoFirebase
	exports.Producto = ProductoDaoFirebase
} else {
	console.log("Error al elegir sistema de datos")
}