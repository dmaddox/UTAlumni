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