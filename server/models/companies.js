'use strict';
module.exports = (sequelize, DataTypes) => {
	const companies = sequelize.define(
		'companies',
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			logo: DataTypes.STRING,
			website: DataTypes.STRING
		},
		{}
	);
	companies.associate = function(models) {
		// associations can be defined here
		// models.companies.hasMany(models.company_employees, {
		// 	foreignKey: 'companyId'
		// });
		companies.hasOne(models.company_employees);
	};
	return companies;
};
