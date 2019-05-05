const bcrypt = require('bcryptjs');
const login = process.env.ADMIN_LOGIN;
const password = process.env.ADMIN_PASSWORD;

module.exports = {
	up: (queryInterface, Sequelize) => {
		// Add altering commands here.
		// Return a promise to correctly handle asynchronicity.

		// Example:
		return queryInterface.bulkInsert(
			'users',
			[
				{
					login,
					password: bcrypt.hashSync(password, 8),
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		// Add reverting commands here.
		// Return a promise to correctly handle asynchronicity.

		// Example:
		return queryInterface.bulkDelete('users', null, {});
	}
};
