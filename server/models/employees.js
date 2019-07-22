'use strict';
module.exports = (sequelize, DataTypes) => {
	const employees = sequelize.define(
		'employees',
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			companyId: DataTypes.NUMBER,
			email: DataTypes.STRING,
			phone: DataTypes.STRING
		},
		{}
	);
	employees.associate = function(models) {
		// associations can be defined here
		models.employees.belongsTo(models.companies, {
			onDelete: 'CASCADE',
			foreignKey: { name: 'companyId', allowNull: false }
		});
	};

	return employees;
};
