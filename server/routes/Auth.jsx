const Joi = require('joi');
const auth = require('../controllers/Auth.jsx');

module.exports = {
	method: 'POST',
	path: '/login',
	config: {
		auth: false,
		validate: {
			payload: {
				login: Joi.string().required(),
				password: Joi.string().required()
			}
		}
	},
	handler: async function(request, h) {
		return auth(request, h);
	}
};
