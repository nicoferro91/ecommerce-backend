const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const logger = require("../logs/loggers");

const UserContainer = require("../daos/login/LoginDaoMongoDB.js");
const User = new UserContainer();

// ---------------------- Utils -----------------------
const isValidPassword = (user, password) => {
	return bcrypt.compareSync(password, user.password);
};

const createHash = password => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// ----------------- Serializers ----------------------
passport.serializeUser((user, done) => {
	logger.log("serializing...");
	done(null, user);
});

passport.deserializeUser((id, done) => {
	logger.log("deserializing...");
	const user = User.getById(id);
	done(null, user);
});

// ------------- Passport Middlewares -----------------
passport.use(
	"login",
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.getByUser(username);

			if (!user) {
				logger.error(`Usuario ${username} no encontrado`);
				return done(null, false, { message: "Usuario no encontrado" });
			}
			// Validación de contraseña
			if (!isValidPassword(user, password)) {
				logger.error("Contraseña incorrecta");
				return done(null, false, { message: "Contraseña incorrecta" });
			}
			done(null, user);
		} catch (err) {
			return done(err, { message: "internal error" });
		}
	})
);

passport.use(
	"register",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, username, password, done) => {
			try {
				let user = await User.getByUser(username);

				if (user) {
					logger.error(`El usuario ${username} ya existe`);
					return done(null, false, { message: "user ya existe" });
				} else {
					const newUser = {
						username: username,
						password: createHash(password),
						fullName: req.body.fullName,
						age: req.body.age,
						phone: req.body.phone,
						address: req.body.address
					};
					await User.save(newUser);

					return done(null, newUser);
				}
			} catch (err) {
				return done(err, { message: "internal error" });
			}
		}
	)
);

module.exports = passport;
