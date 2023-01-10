const express = require("express");
const { Router } = express;
const routerLogin = Router();
const passport = require("../utils/passportMiddleware");

const {
	postLogin,
	getLogin,
	getFailedLogin,
	getLogout
} = require("../controllers/controller.logins");

routerLogin.post(
	"/login",
	passport.authenticate("login", {
		successRedirect: "/",
		failureRedirect: "faillogin"
	}),
	postLogin
);

routerLogin.get("/login", getLogin);

routerLogin.get("/faillogin", getFailedLogin);

// logout
routerLogin.get("/logout", getLogout);

module.exports = { routerLogin };
