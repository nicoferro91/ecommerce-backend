const logger = require("../logs/loggers");

const { Producto } = require("../daos/index.js");
const Productos = new Producto();

const getProduct = async (req, res) => {
	// y también quiero que lea de la base de dato si hay algo
	const productosDB = await Productos.getAll();
	res.render("productos", {
		titulo: "Productos",
		list: productosDB,
		listExist: true,
		producto: true
	});
};

const getProductId = async (req, res) => {
	const { id } = req.params;

	if (id) {
		Productos.getById(id).then(data => {
			res.send(data);
		});
	} else {
		logger.error("PRODUCTO NO ENCONTRADO");
	}
};

const getProductCategory = (req, res) => {
	const { category } = req.params;

	if (category) {
		Productos.getByCategory(category).then(data => {
			res.send(data);
		});
	} else {
		logger.error("PRODUCTO NO ENCONTRADO");
	}
};

const postProduct = async (req, res) => {
	let timestamp = Date.now();
	let { title, price, thumbnail } = req.body;
	let producto = {
		title,
		price,
		thumbnail,
		timestamp
	};
	await Productos.save(producto);
	res.render("producto");
};

const putProduct = (req, res) => {
	let timestamp = Date.now();
	let { title, price, thumbnail } = req.body;
	let producto = {
		title,
		price,
		thumbnail,
		timestamp
	};
	Productos.updateById(producto).then(data => {
		res.json({ id: data });
	});
};

const deleteProduct = async (req, res) => {
	const { id } = req.params;

	Productos.deleteById(id).then(data => {
		res.json({ delete: data });
	});
};

module.exports = {
	getProduct,
	getProductId,
	getProductCategory,
	postProduct,
	putProduct,
	deleteProduct
};
