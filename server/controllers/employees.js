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
}

module.exports = new Employees();
