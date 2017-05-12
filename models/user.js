//here we are creating the table with sequlize that will store user data
module.exports = function(sequelize, Sequelize) {

	var User = sequelize.define('user', {

		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		firstname: {
			type: Sequelize.STRING,
			notEmpty: true
		},

		lastname: {
			type: Sequelize.STRING,
			notEmpty: true
		},

		about: {
			type: Sequelize.TEXT
		},

		email: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},

		password: {
			type: Sequelize.STRING,
			allowNull: false
		},

		last_login: {
			type: Sequelize.DATE
		},

		status: {
			type: Sequelize.STRING
		},

		cohort: {
			type: Sequelize.STRING
		},

		linkedInURL: {
			type: Sequelize.STRING

		},

		profilePic: {
			type: Sequelize.STRING

		},

		city: {
			type: Sequelize.STRING
		},
		state: {
			type: Sequelize.STRING
		},

		portfolioURL: {
			type: Sequelize.STRING
		},

		first_salary: {
			type: Sequelize.STRING
		},

		employer: {
			type: Sequelize.STRING
		},

		interview_time: {
			type: Sequelize.STRING
		},

		mentor: {
			type: Sequelize.STRING
		},

	});

	return User;
};
