'use strict';
module.exports = (sequelize, DataTypes) => {
	const company_employees = sequelize.define(
		'company_employees',
		{
			companyId: DataTypes.INTEGER,
			employeeId: DataTypes.INTEGER
		},
		{}
	);
	company_employees.associate = function(models) {
		// associations can be defined here
		// models.company_employees.belongsTo(models.companies, {
		// 	onDelete: 'CASCADE',
		// 	foreignKey: 'companyId'
		// 	// as: companies
		// });
		// models.company_employees.belongsTo(models.employees, {
		// 	onDelete: 'CASCADE',
		// 	foreignKey: { name: 'id', allowNull: false }
		// });
	};
	return company_employees;
};
