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

		graduation: {
			type: Sequelize.DATE
		},

		linkedIn_url: {
			type: Sequelize.STRING

		},

		profile_photo: {
			type: Sequelize.STRING

		},

		personal_website: {
			type: Sequelize.STRING
		},

		first_salary: {
			type: Sequelize.STRING
		},

		first_job: {
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

}