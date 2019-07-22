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
		models.companies.hasMany(models.employees, {
			foreignKey: 'companyId'
		});
	};
	return companies;
};
