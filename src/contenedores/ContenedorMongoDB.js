const mongoConnect = require("../utils/mongoconnect");

class ContenedorMongoDB {
	constructor(url, modelo) {
		this.url = url;
		this.modelo = modelo;
		this.connexion();
	}

	async connexion() {
		await mongoConnect();
	}

	async save(obj) {
		try {
			let guardar = new this.modelo(obj);
			await guardar.save();
			return guardar._id;
		} catch (error) {
			console.log(`error al guardar: ${error}`);
		}
	}

	// traer objeto por id
	async getById(id) {
		try {
			let datos = await this.modelo.findOne({ _id: id });
			let newDatos = { ...datos._doc, id: datos._id.toString() };
			return newDatos;
		} catch (error) {
			return `No se pudo traer objeto ${id}. ${error}`;
		}
	}

	//traer todos los objetos
	async getAll() {
		try {
			let datos = await this.modelo.find({});
			let newDatos = datos.map(el => {
				return { ...el._doc, id: el._id.toString() };
			});
			return newDatos;
		} catch (error) {
			console.log(`error al listar: ${error}`);
			return [];
		} finally {
		}
	}

	// eliminar objeto por id
	async deleteById(id) {
		try {
			let datos = await this.modelo.deleteOne({ _id: id });
			return datos;
		} catch (error) {
			console.log(`error al eliminar: ${error}`);
		} finally {
		}
	}

	async updateById(obj) {
		try {
			await this.modelo.updateOne({ _id: obj.id }, { $set: { ...obj } });
			return obj.id;
		} catch (error) {
			console.log(`error al actualizar: ${error}`);
		}
	}
}

module.exports = ContenedorMongoDB;
