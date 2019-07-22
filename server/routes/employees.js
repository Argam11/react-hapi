const Joi = require('joi');
const jwt = require('jsonwebtoken');
const employees = require('../controllers/employees');

const secret = process.env.JWT_SECRET;

module.exports = [
	{
		method: 'GET',
		path: '/employees',
		handler: async function(request, h) {
			return employees.getAll(request, h);
		}
	},
	{
		method: 'GET',
		path: '/test',
		config: {
			// auth: false
		},
		handler: async function(request, h) {
			// console.log(request.auth.credentials.user);

			return 11;
		}
	},
	{
		method: 'POST',
		path: '/verify',
		config: {
			auth: false
		},
		handler: async function(req, h) {
			jwt.verify(req.payload.token, secret, (err, authorizedData) => {
				console.log(err);
			});

			return 22;
		}
	}
];
