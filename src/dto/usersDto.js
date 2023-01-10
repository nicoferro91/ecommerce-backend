class UsersDto {
	constructor(user) {
		(this.username = user.username), (this.password = user.password);
	}
}

module.exports = UsersDto;
