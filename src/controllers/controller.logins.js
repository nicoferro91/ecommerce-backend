const logger = require("../logs/loggers");

const postLogin = (req, res) => {
	logger.log("data Login");
	res.render("/", { username: req.body.username });
};

const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		let user = req.user;
		res.render("/", { user });
	} else {
		logger.error("Usuario no loggeado");
		res.render("login");
	}
};

const getFailedLogin = (req, res) => {
	logger.info("Error de Login");
	res.render("faillogin");
};

const getLogout = async (req, res = response, next) => {
	req.logout(err => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
};

module.exports = { postLogin, getLogin, getFailedLogin, getLogout };
