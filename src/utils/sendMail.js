const dotenv = require("dotenv").config();
const { createTransport } = require("nodemailer");
const { logger } = require("../logs/loggers.js");
const { GMAIL } = process.env;

const transporter = createTransport({
	host: "gmail",
	port: 587,
	auth: {
		user: "nicoferro91@gmail.com",
		pass: GMAIL
	}
});

const mailer = async mailOptions => {
	try {
		const info = await transporter.sendMail(mailOptions);
		logger.info(info);
	} catch (error) {
		logger.error(error);
	}
};

const mailerSendOrder = (products, email) => {
	const sendOrderMessage =
		`
                        <div style="width:500px">
                        <p>Nuevo pedido del usuario:</p>
                        <h3>${email}</h3>
                        <table style="text-align: center; border-collapse: collapse;width: 100%">

                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>

                        <tbody>` +
		products
			.map(
				(el, index) => `
                            <tr>
                                <td>${el.description}</td>
                                <td>$ ${el.price}</td>
                                <td>${el.quantity}</td>
                                <td>
                                    <img src=${el.thumbnail} style="width: 50px;height: 50px"/>
                                </td>
                            </tr>`
			)
			.join("") +
		`</tbody>

                          </table>

                        </div>
                          `;

	const mailOptions = {
		from: "Nico",
		to: "nicoferro91@gmail.com",
		subject: `Nueva Orden de Compra de: ${email}`,
		html: sendOrderMessage
	};

	mailer(mailOptions);
};

module.exports = { mailer, mailerSendOrder };
