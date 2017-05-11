//load bcrypt
var bCrypt = require('bcrypt-nodejs');
//configure passport
module.exports = function(passport, user) {
	var User = user;
	//used by passport to create authentication
	var LocalStrategy = require('passport-local').Strategy;
	passport.use('local-signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		function(req, email, password, done) {
			var generateHash = function(password) {
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			};
			//use sequalize to check to see if email is taken in database
			User.findOne({
				where: {
					email: email
				}
				// if email is taken, alert user
			}).then(function(user) {
				if (user) {
					return done(null, false, {
						message: 'That email is already taken'
					});
	//if email isn't taken, hash password and data to be used to create new user
				} else {
					var userPassword = generateHash(password);
					var data = {
						email: email, //come back to match ana file
						password: userPassword, //come back to match ana file
						firstname: req.body.fname,
						lastname: req.body.lname,
						cohort: req.body.cohort,
						status: req.body.status,
						city: req.body.city,
						state: req.body.state,
						linkedInURL: req.body.linkedInURL,
						profilePic: req.body.profilePic,
						portfolioURL: req.body.portfolioURL

					};
					//create a new user
					console.log(req.body.status);
					User.create(data).then(function(newUser, created) {
						//if not a new user, don't make a new user
						if (!newUser) {
							return done(null, false);
						}
						if (newUser) {
							return done(null, newUser);
						}
					});
				}
			});
		}
	));
	//serialize
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	// deserialize user
	passport.deserializeUser(function(id, done) {
		User.findById(id).then(function(user) {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});
	//LOCAL SIGNIN
	passport.use('local-signin', new LocalStrategy(
		{
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'sign-in-email',
			passwordField: 'sign-in-password',
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		function(req, email, password, done) {
			var User = user;
			//encrypt password
			var isValidPassword = function(userpass, password) {
				return bCrypt.compareSync(password, userpass);
			};
			//check to see if email is in database
			User.findOne({
				where: {
					email: email
				}
				// if email not in database, alert user
			}).then(function(user) {
				if (!user) {
					return done(null, false, {
						message: 'Email does not exist'
					});
				}
				//if password isn't right, alert user
				if (!isValidPassword(user.password, password)) {
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}
				var userinfo = user.get();
				return done(null, userinfo);
				//if an error is thrown, alert user
			}).catch(function(err) {
				console.log("Error:", err);
				return done(null, false, {
					message: 'Something went wrong with your Signin'
				});
			});
		}
	));
};
