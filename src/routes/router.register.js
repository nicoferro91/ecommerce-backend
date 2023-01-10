const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join("../.env") });

const express = require("express");
const { Router } = express;
const routerRegister = Router();

const logger = require("../logs/loggers");

const fs = require("fs");
const imagenesPath = require("../img/img.paths.js");

const multer = require("multer");
const upload = multer();

const passport = require("../utils/passportMiddleware");

const { createTransport } = require("nodemailer");
const { GMAIL } = process.env;

const transporter = createTransport({
	host: "gmail",
	port: 587,
	auth: {
		user: "nicoferro91@gmail.com",
		pass: GMAIL
	}
});

const mailOptions = {
	from: "Nico",
	to: "nicoferro91@gmail.com",
	subject: "Usuario nuevo registrado",
	html: `
        <h2>Hola!</h2>
        <p>¡Bienvenido al nuevo usuario!</p>
      `
};

routerRegister.get("/register", (req, res) => {
	res.render("register");
});
// post para registrarse
routerRegister.post(
	"/register",
	upload.single("image"),
	passport.authenticate("register", {
		failureRedirect: "failregister",
		successRedirect: "/"
	}),
	async (req, res) => {
		try {
			const info = await transporter.sendMail(mailOptions);
			console.log(info);
		} catch (error) {
			logger.error("ERROR NODEMAILER");
		} finally {
			res.render("/login", { username: req.body.username });
		}
	}
);

//error de registro
routerRegister.get("/failregister", (req, res) => {
	logger.error("Error de registro");
	// now redirect to failregister.hbs
	res.render("failregister");
});

module.exports = { routerRegister };
