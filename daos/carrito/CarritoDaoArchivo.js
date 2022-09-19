const { Contenedor } = require("../../contenedores/contenedorArchivo")

class CarritoDaoArchivo extends Contenedor {
	constructor() {
		super("../../data/carritos.json")
	}
	//Metodos particulares de Carrito
	
}

module.exports = CarritoDaoArchivo