var passport = require('passport');
var db = require('../models');
var path = require("path");
module.exports = function(app) {

	app.get('/signup', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/sign-up.html"));
	});
	app.get('/signin', function(req, res) {
		res.render('signin');
	});
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/signup'
	}));
	app.get('/dashboard', isLoggedIn, function(req, res) {
		res.sendFile(path.join(__dirname, "../public/dashboard.html"));
	});

	app.get('/logout', function(req, res) {
		req.session.destroy(function(err) {
			res.redirect('/');
		});
	});
	app.post('/signin', passport.authenticate('local-signin', {
		successRedirect: '/dashboard',
		failureRedirect: '/signin'
	}));
	app.get("/api/users", isLoggedIn, function(req, res) {
		var array = [];
		db.user.findOne({
			where: {
				id: req.user.id
			}
		}).then(function(dbUser) {
			array.push(dbUser);
			db.user.findAll({}).then(function(dbAll) {
				array.push(dbAll);
				res.json(array);
			})
		})
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/signin');
	}
}