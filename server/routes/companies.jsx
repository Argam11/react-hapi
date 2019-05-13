const Joi = require('joi');
const companies = require('../controllers/companies.jsx');

module.exports = [
	{
		method: 'POST',
		path: '/createCompany',
		config: {
			validate: {
				payload: {
					name: Joi.string().required(),
					email: Joi.string().email().required(),
					logo: Joi.string().required(),
					website: Joi.string().required()
				}
			}
		},
		handler: async function(request, h) {
			return companies.create(request, h);
		}
	}
];
