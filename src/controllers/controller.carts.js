const { Carrito } = require("../daos/index.js");
const logger = require("../logs/loggers.js");
const Carritos = new Carrito();

const getCart = async (req, res) => {
	try {
		res.render("carrito", { username: req.body.username });
	} catch (error) {
		logger.error(error);
	}
};

const postCartId = async (req, res) => {
	const idCart = await Carritos.save(req.body);
	try {
		res.json(idCart);
	} catch (error) {
		logger.error(error);
	}
};

const deleteCartId = async (req, res) => {
	const { id } = req.params;

	try {
		await Carritos.deleteById(id);
	} catch (error) {
		logger.error(error);
	}
};

const getProductsFromCart = async (req, res) => {
	const { id } = req.params;
	try {
		const cartById = await Carritos.getById(id);
		productsList = cartById.products;
		res.json(productsList);
	} catch (error) {
		logger.error(error);
	}
};

const postProductToCart = async (req, res) => {
	const { id } = req.params;
	const productToAdd = req.body;

	try {
		cartById = await Carritos.addProductToCart(id, productToAdd);
		res.json(cartById);
	} catch (error) {
		logger.error(error);
	}
};

const deleteProductFromCart = async (req, res) => {
	const { idCart, idProduct } = req.params;

	try {
		await Carritos.deleteProductById(idCart, idProduct);
	} catch (error) {
		logger.error(error);
	}
};

const getCartByEmail = async (req, res) => {
	const { emailId } = req.params;
	console.log("email: ", emailId);
	try {
		const cartByEmail = await Carritos.getByEmail(emailId);
		console.log(cartByEmail);
		res.json(cartByEmail);
	} catch (error) {
		logger.error(error);
	}
};

module.exports = {
	getCart,
	postCartId,
	deleteCartId,
	getProductsFromCart,
	postProductToCart,
	deleteProductFromCart,
	getCartByEmail
};
