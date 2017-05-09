// here is the table created by sequelize that will hold the email and name of users
//it's being exported to use in other modules
module.exports = function(sequelize, Sequelize) {
var emailTable =  sequelize.define('emailTable', {

		email: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},
			firstname: {
			type: Sequelize.STRING,
			notEmpty: true
		},

		lastname: {
			type: Sequelize.STRING,
			notEmpty: true
		}
	});
	return emailTable;

}