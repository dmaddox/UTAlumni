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

		username: {
			type: Sequelize.TEXT
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
			type: Sequelize.ENUM('active', 'inactive'),
			defaultValue: 'active'
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

		location: {
			type: Sequelize.STRING
		},

		portfolioURL: {
			type: Sequelize.STRING
		},

		first_salary: {
			type: Sequelize.STRING
		},

		employment: {
			type: Sequelize.STRING
		},

		interview_time: {
			type: Sequelize.STRING
		},

		mentor: {
			type: Sequelize.BOOLEAN
		},

		user_comment: {
			type: Sequelize.TEXT
		}
	});

	return User;

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