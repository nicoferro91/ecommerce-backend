const express = require("express");
require("dotenv").config();

const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cp = require("cookie-parser");

const app = express();

// --- WEBSOCKET
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

// --- middleware ----------------
app.use(cp());
const passport = require("./utils/passportMiddleware");

// --- Routers ----
const { routerHome } = require("./routes/router.home");
const { routerProductos } = require("./routes/router.products");
const { routerCarrito } = require("./routes/router.cart.js");
const { routerLogin } = require("./routes/router.login");
const { routerProfile } = require("./routes/router.profile");
const { routerRegister } = require("./routes/router.register");
const { routerInfo } = require("./routes/router.info");
const { routerChat } = require("./routes/router.chat");
const { routerOrden } = require("./routes/router.orders.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 4000;

const { Chat } = require("./daos/index.js");

// LOG4JS
const logger = require("./logs/loggers");

app.set("view engine", "hbs");
app.set("views", "./src/views/layouts");

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URL,
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		}),
		secret: process.env.MONGODB_SECRETO,
		resave: false,
		rolling: true,
		saveUninitialized: false,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 90000
		}
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// ------------ ROUTERS -----------------
// HOME
app.use("/", routerHome);
// PRODUCTOS
app.use("/productos", routerProductos);
// CARRITO
app.use("/carrito", routerCarrito);
//ÓRDENES
app.use("/ordenes", routerOrden);
// LOGIN
app.use("/", routerLogin);
// PROFILE
app.use("/", routerProfile);
// REGISTER
app.use("/", routerRegister);
// ----- INFO PAGE ----
app.use("/", routerInfo);
// ----- CHAT ----
app.use("/", routerChat);

/* ------------ CHAT ------------ */
io.on("connection", async socket => {
	const Chats = new Chat();
	let mensajesChat = await Chats.getAll();
	logger.info("Se contectó un usuario");

	const mensaje = {
		mensaje: "ok",
		mensajesChat
	};

	socket.emit("mensaje-servidor", mensaje);

	socket.on("mensaje-nuevo", async (msg, cb) => {
		console.log(mensajesChat);

		mensajesChat.push(msg);
		console.log(mensajesChat);
		const mensaje = {
			mensaje: "mensaje nuevo",
			mensajesChat
		};

		const id = new Date().getTime();
		io.sockets.emit("mensaje-servidor", mensaje);
		cb(id);
		await Chats.save({
			id,
			mail: msg.mail,
			msg: msg.msg
		});
	});
});

// logger
app.get("*", (req, res, next) => {
	logger.error("ERROR 404 - NO ENCONTRADO");
	res.sendStatus("404");
});

//--------- listener
httpServer.listen(PORT, () => {
	logger.info(`Server listening on ${PORT}`);
});
