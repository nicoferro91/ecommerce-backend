const express = require("express");
const { Router } = express;
const routerProfile = Router();

const checkAuthentication = require("../utils/checkAuthentication");

const { Login } = require("../daos/index.js");

routerProfile.get("/profile", checkAuthentication, async (req, res) => {
	const UserContainer = new Login();
	// get user by session id
	const user = await UserContainer.getById(req.session.passport.user);
	// console.log("user", user);
	res.render("profile", { user });
});

module.exports = { routerProfile };
