const Boom = require('boom');
const companies = require('../models').companies;

class Companies {
	async create(req, res) {
		let { name, email, logo, website } = req.payload;
		try {
			await companies.create({ name, email, logo, website });

			return 'success';
		} catch (err) {
			return err;
		}
	}
}

module.exports = new Companies();
