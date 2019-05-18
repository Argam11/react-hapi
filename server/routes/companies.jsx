const Joi = require('joi');
const fs = require('fs');
const path = require('path');

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
	},
	{
		method: 'POST',
		path: '/upload',
		config: {
			payload: {
				output: 'stream',
				parse: true,
				allow: 'multipart/form-data',
				maxBytes: 2 * 1000 * 1000
			}
		},
		handler: (request, h) => {
			let filePath = request.payload['file'].hapi.filename;

			request.payload['file'].pipe(
				fs.createWriteStream(path.join(__dirname + '/../../public/images/' + filePath))
			);
			return filePath;
		}
	},
	{
		method: 'GET',
		path: '/companies',
		handler: async function(request, h) {
			return companies.getAll(request, h);
		}
	},
	{
		method: 'GET',
		path: '/companies/{id}',
		handler: async function(request, h) {
			return companies.getOne(request, h);
		}
	},
	{
		method: 'PUT',
		path: '/companies/{id}',
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
			return companies.update(request, h);
		}
	},
	{
		method: 'DELETE',
		path: '/companies/{id}',
		handler: async function(request, h) {
			return companies.delete(request, h);
		}
	}
];
