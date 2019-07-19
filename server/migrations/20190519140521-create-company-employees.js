'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('company_employees', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			companyId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'companies',
					key: 'id'
				}
			},
			employeeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'employees',
					key: 'id'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('company_employees');
	}
};
