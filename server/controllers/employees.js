const Boom = require('boom');
const fs = require('fs');
const path = require('path');
const employees = require('../models').employees;
const companies = require('../models').companies;

class Employees {
	async getAll(req, res) {
		try {
			const allEmployees = await employees.findAll({
				include: [
					{
						model: companies
					}
				]
			});

			return allEmployees;
		} catch (err) {
			return err;
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const getOneEmployee = await employees.findOne({
				where: {
					id
				}
			});

			return getOneEmployee;
		} catch (err) {
			return err;
		}
	}

	async store(req, res) {
		try {
			const { firstName, lastName, companyId, email, phone } = req.payload;
			const createEmployee = await employees.create({
				firstName,
				lastName,
				companyId,
				email,
				phone
			});

			return createEmployee;
		} catch (err) {
			return err;
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params;
			const { firstName, lastName, companyId, email, phone } = req.payload;
			const updateEmployee = await employees.update(
				{
					firstName,
					lastName,
					companyId,
					email,
					phone
				},
				{
					where: {
						id
					}
				}
			);
			if (!updateEmployee[0]) {
				throw Boom.notFound('Employee not found');
			}

			return 'success';
		} catch (err) {
			return err;
		}
	}

	async destroy(req, res) {
		try {
			const { id } = req.params;
			const deleteEmployee = await employees.destroy({
				where: {
					id
				}
			});
			if (!deleteEmployee) {
				throw Boom.notFound('Employee not found');
			}

			return 'success';
		} catch (err) {
			return err;
		}
	}
}

module.exports = new Employees();
