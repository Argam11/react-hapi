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
	async getAll(req, res) {
		try {
			let allCompanies = await companies.findAll();

			return allCompanies;
		} catch (err) {
			return err;
		}
	}
	async getOne(req, res) {
		let { id } = req.params;
		try {
			let company = await companies.findOne({
				where: {
					id
				}
			});

			return company;
		} catch (err) {
			return err;
		}
	}
	async update(req, res) {
		let { name, email, logo, website } = req.payload;
		let { id } = req.params;
		try {
			await companies.update(
				{
					name,
					email,
					logo,
					website
				},
				{
					where: {
						id
					}
				}
			);

			return 'success';
		} catch (err) {
			return err;
		}
	}
	async delete(req, res) {
		let { id } = req.params;
		try {
			await companies.destroy({
				where: {
					id
				}
			});

			return 'success';
		} catch (err) {
			return err;
		}
	}
}

module.exports = new Companies();
