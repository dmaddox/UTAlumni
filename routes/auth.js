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
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });
  //information from /signup is posted to database
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/myProfile',
    failureRedirect: '/signup'
  }));
  //when local host URL has /dashboard, dashboard.html is displayed
  app.get('/dashboard', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
  });
  // got to the about page, no log in required
  app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/about.html"));
  });
  //session is ended and user is redirected to the index when logged out
  app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/');
      }
    });
  });

  // once user is logged in, send to dashboard page
  app.post('/', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }));

  // from index.html, send user from initial signup form to the sign-up.html
  app.post('/index', function(req, res) {
    res.redirect('/signup');
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
    });
  });

  //if user is logged in and goes to /myProfile URL, myProfile.html will be shown
  app.get("/myProfile", isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/myProfile.html"));
  });
  //information added by user in the /myProfile page will be posted to the database
  app.post("/myProfile", isLoggedIn, function(req, res) {
    var boolean;
    db.user.update({
      employer: req.body.employer,
      city: req.body.city,
      state: req.body.state,
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
    });
    res.redirect('myProfile');
  });
  app.get("/api/stats/", isLoggedIn, function(req, res) {
    var inTech;
    var employedOutTech;
    var studentNum;
    var noJobNum;
    var dataObject;
    db.user.findAll({
      where: {
        status: "employed-tech"
      }
    }).then(function(data) {
      inTech = data.length;
      db.user.findAll({
        where: {
          status: "employed-else"
        }
      }).then(function(employedElse) {
        employedOutTech = employedElse.length;
        db.user.findAll({
          where: {
            status: "current-student"
          }
        }).then(function(current) {
          studentNum = current.length;
          db.user.findAll({
            where: {
              status: "seeking"
            }
          }).then(function(seeking) {
            noJobNum = seeking.length;
            db.user.findAll({
              where: {
                $or: [
                  {
                    interview_time: "0 months"
                  }, {
                    interview_time: "1 months"
                  }, {
                    interview_time: "2 months"
                  }, {
                    interview_time: "3 months"
                  }
                ]
              }
            }).then(function(zeroToThree) {
              var zeroNum = zeroToThree.length;
              db.user.findAll({
                where: {
                  $or: [
                    {
                      interview_time: "4 months"
                    }, {
                      interview_time: "5 months"
                    }, {
                      interview_time: "6 months"
                    }, {
                      interview_time: "7 months"
                    }
                  ]
                }
              }).then(function(fourToSeven) {
                var fourNum = fourToSeven.length;
                db.user.findAll({
                  where: {
                    $or: [
                      {
                        interview_time: "8 months"
                      }, {
                        interview_time: "9 months"
                      }, {
                        interview_time: "10 months"
                      }, {
                        interview_time: "11 months"
                      }, {
                        interview_time: "12 months"
                      }
                    ]
                  }
                }).then(function(eightToTwelve) {
                  var eightNum = eightToTwelve.length;
									dataObject = {
										employedTech: inTech,
										employedElse: employedOutTech,
										studentNum: studentNum,
										noJob: noJobNum,
										zeroToThree: zeroNum,
										fourToSeven: fourNum,
										eightToTwelve: eightNum
									};
									res.json(dataObject);
                });
              });
            });
          });
        });
      });
    });
  });
  //determine is user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
  // Handle 404 - Keep this as a last route
  app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
  });
};
