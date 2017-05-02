var db = require('../models')
var exports = module.exports = {}
exports.signup = function(req, res) {
	res.render('signup');
}
exports.signin = function(req, res) {
	res.render('signin');
}
exports.dashboard = function(req, res) {
	db.user.findOne({
		where: {
			email: "b_shehadi@yahoo.com"
		}
	}).then(function(user) {
		console.log(user);
		res.render('dashboard',user);
	})
}
exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
}