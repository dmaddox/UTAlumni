var authController = require('../controller/authcontroller.js');
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
		db.user.findOne({
			where: {
				email: "b_shehadi@yahoo.com"
			}
		}).then(function(user) {
			console.log(user);
			res.render('dashboard', user);
		})
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
		// var array = []
		// 	// findAll returns all entries for a table when used with no options
		// db.user.findAll({}).then(function(dbUser) {
		// 	// We have access to the todos as an argument inside of the callback function
		// 	dbUser.push(array);
		// 	db.user.findOne({
		// 		where: {
		// 			id: //passport id
		// 		}
		// 	}).then(function(dbIndvidual) {
		// 		dbIndvidual.push(array)
		// 		res.json(array);
		// 	})
		// });

		// findAll returns all entries for a table when used with no options
		db.user.findAll({}).then(function(dbuser) {
			// We have access to the todos as an argument inside of the callback function
			res.json(dbuser);
		});


	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/signin');
	}
}