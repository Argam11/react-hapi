const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Boom = require('boom');

const User = require('../models').User;

async function Login(req, res) {
	let { login, password } = req.payload;
	try {
		let user = await User.findOne({ where: { login }, raw: true });
		if (user) {
			let match = bcrypt.compareSync(password, user.password);
			if (match) {
				const token = jwt.sign({}, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', { expiresIn: '7d' });
				const response = {
					token
				};
				return response;
			} else {
				return new Boom('Wrong password', { statusCode: 400 });
			}
		} else {
			return new Boom('Wrong login', { statusCode: 400 });
		}
	} catch (err) {
		return err;
	}
}

module.exports = Login;
