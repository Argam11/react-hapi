const Joi = require('joi');
const employees = require('../controllers/employees');

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
		path: '/employees/{id}',
		handler: async function(request, h) {
			return employees.getOne(request, h);
		}
	},
	{
		method: 'POST',
		path: '/employees',
		config: {
			validate: {
				payload: {
					firstName: Joi.string().required(),
					lastName: Joi.string().required(),
					companyId: Joi.number().required(),
					email: Joi.string().email().required(),
					phone: Joi.string().required()
				}
			}
		},
		handler: async function(request, h) {
			return employees.store(request, h);
		}
	},
	{
		method: 'PUT',
		path: '/employees/{id}',
		config: {
			validate: {
				payload: {
					firstName: Joi.string().required(),
					lastName: Joi.string().required(),
					companyId: Joi.number().required(),
					email: Joi.string().email().required(),
					phone: Joi.string().required()
				}
			}
		},
		handler: async function(request, h) {
			return employees.update(request, h);
		}
	},
	{
		method: 'DELETE',
		path: '/employees/{id}',
		config: {
			validate: {
				params: {
					id: Joi.string().required()
				}
			}
		},
		handler: async function(request, h) {
			return employees.destroy(request, h);
		}
	}
];
