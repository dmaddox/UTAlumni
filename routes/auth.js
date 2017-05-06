var passport = require('passport');
var db = require('../models');
var path = require("path");
module.exports = function(app) {

	app.get('/signup', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/sign-up.html"));
	});
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/index.html"))
	});
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/signup'
	}));
	app.get('/dashboard', isLoggedIn, function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
	});
	// got to the about page, no log in required
	app.get("/about", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/about.html"));
	})
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
	app.get("/myProfile", isLoggedIn, function(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/myProfile.html"));
	})
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
		if(req.body.mentor==="yes"){
			boolean = true;
		}
		else{
			boolean = false;
		}
		db.user.update({
			email: req.body.email,
			employer: req.body.employer,
			location: req.body.location,
			linkedInURL: req.body.linkedInURL,
			profilePic: req.body.profilePic,
			portfolioURL: req.body.portfolioURL,
			about: req.body.about,
			mentor: boolean,
			interview_time: req.body.interview_time,
			first_salary: req.body.first_salary,
			status: req.body.status
		}, {
			where: { id: req.user.id}
		}).then(function(result) {
			console.log(result);
		})
		res.redirect('myProfile');
	})

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/');
	}
}