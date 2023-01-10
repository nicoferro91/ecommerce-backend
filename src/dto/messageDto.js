class MessageDto {
	constructor(message) {
		(this.mail = message.mail),
			(this.fecha = message.fecha),
			(this.msg = message.msg);
		// mail,		msg, fecha;
	}
}

module.exports = MessageDto;
