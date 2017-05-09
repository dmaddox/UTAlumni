//require dependencies
var passport = require('passport');
var db = require('../models');
var path = require("path");
module.exports = function(app) {
//when local host URL has /signup, sign-up.html is displayed
	app.get('/signup', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/sign-up.html"));
	});
//when local host URL has /, index.html is displayed
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/index.html"))
	});
//information from /signup is posted to database
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/signup'
	}));
//when local host URL has /dashboard, dashboard.html is displayed
	app.get('/dashboard', isLoggedIn, function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
	});
	// got to the about page, no log in required
	app.get("/about", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/about.html"));
	})
//session is ended and user is redirected to the index when logged out
	app.get('/logout', function(req, res) {
		req.session.destroy(function(err) {
			res.redirect('/');
		});
	});

	// once user is logged in, send to dashboard page
	app.post('/', passport.authenticate('local-signin', {
		successRedirect: '/dashboard',
		failureRedirect: '/'
	}));

	// from index.html, send user from initial signup form to the sign-up.html
	app.post('/index', function(req, res) {
		res.redirect('/signup')
	});
	// app.get("/api/currentUser", isLoggedIn, function(req,res){
	// 	res.redirect("/api/indv/"+ req.user.id);
	// })
	app.get("/api/currentUser", function(req, res) {
		db.user.findOne({
			where: {
				id: req.user.id
			}
		}).then(function(result) {
			res.json(result);
		});
	});
	app.get("/api/users", function(req, res) {
		db.user.findAll({}).then(function(dbAll) {
			res.json(dbAll);
		})
	});

//if user is logged in and goes to /myProfile URL, myProfile.html will be shown
	app.get("/myProfile", isLoggedIn, function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/myProfile.html"));
	})
//information added by user in the /myProfile page will be posted to the database
	app.post("/myProfile", isLoggedIn, function(req, res) {
		var boolean
		console.log(req.body.email);
		console.log(req.body.status);
		console.log(req.body.location);
		console.log(req.body.linkedInURL);
		console.log(req.body.profilePic);
		console.log(req.body.portfolioURL);
		console.log(req.body.about);
		console.log(req.body.mentor);
		console.log(req.body.interview_time);
		console.log(req.body.first_salary);
		// console.log(req.body.status);
		db.user.update({
			email: req.body.email,
			employer: req.body.employer,
			location: req.body.location,
			linkedInURL: req.body.linkedInURL,
			profilePic: req.body.profilePic,
			portfolioURL: req.body.portfolioURL,
			about: req.body.about,
			mentor: req.body.mentor,
			interview_time: req.body.interview_time,
			first_salary: req.body.first_salary,
			status: req.body.status
		}, {
			where: {
				id: req.user.id
			}
		}).then(function(result) {
			console.log(result);
		})
		res.redirect('myProfile');
	})
//determine is user is logged in
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/');
	}
	// Handle 404 - Keep this as a last route
	app.use(function(req, res, next) {
		res.status(400);
		res.send('404: File Not Found');
	});
}