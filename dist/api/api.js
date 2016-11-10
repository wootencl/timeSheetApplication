require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// NOTES:
	// - Tutorial: https://scotch.io/tutorials/easy-node-authentication-setup-and-local#application-setup-server-js

	'use strict';

	var express = __webpack_require__(1);
	var app = express();
	var port = process.env.PORT || 3000;
	var passport = __webpack_require__(2);
	var flash = __webpack_require__(3);

	var morgan = __webpack_require__(4);
	var bodyParser = __webpack_require__(5);
	var session = __webpack_require__(6);

	console.log(__dirname);
	app.use(express.static(__dirname + '/../app'));
	app.use('/bower_components', express.static(__dirname + '/../app/bower_components'));

	var configDB = __webpack_require__(7);

	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	//passport setup
	app.use(session({ secret: 'E4393BD8F59EA85B3BC912CF4772E',
	  saveUninitialized: true,
	  resave: true,
	  cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 }
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	//passport setup
	__webpack_require__(8)(passport);
	//routes
	__webpack_require__(15)(app, passport);

	var server = app.listen(port, '127.0.0.1', function () {
	  var host = server.address().address;
	  var port = server.address().port;
	  console.log('App listening at http://%s:%s', host, port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("connect-flash");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  'connectionData': {
	    'host': 'localhost',
	    'user': 'tSADBAdmin',
	    'password': 'Elevation2016?',
	    'database': 'timeSheetApplication',
	    'connectionLimit': '100'
	  },
	  'database': 'timeSheetApplication'
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LocalStrategy = __webpack_require__(9).Strategy;
	var Promise = __webpack_require__(10);

	var Person = __webpack_require__(11);
	var getSqlConnection = __webpack_require__(13);

	module.exports = function (passport) {
	  passport.serializeUser(function (user, done) {
	    done(null, user.auth_id);
	  });

	  passport.deserializeUser(function (id, done) {
	    Promise.using(getSqlConnection(), function (connection) {
	      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons WHERE hex(ID) = ?", id).then(function (results) {
	        done(null, results[0]);
	      }).catch(function (error) {
	        done(err, null);
	      });
	    });
	  });

	  passport.use('local-signup', new LocalStrategy({
	    usernameField: 'Email',
	    passwordField: 'Password',
	    passReqToCallback: true
	  }, function (req, email, password, done) {
	    process.nextTick(function () {
	      Promise.using(getSqlConnection(), function (connection) {
	        //checking if the authenticationToken exists
	        connection.query("SELECT 1 FROM Persons WHERE hex(ID) = ?", [req.body.AuthToken]).then(function (rows) {
	          if (rows.length === 0) {
	            return done(null, false, { statusCode: 404, message: 'That token does not seem to exist.' });
	          } else {
	            //checking if the token has already been used.
	            return connection.query("SELECT 1 FROM Persons WHERE hex(ID) = ? AND Password is NOT NULL", [req.body.AuthToken]).then(function (rows) {
	              if (rows.length) {
	                return done(null, false, { statusCode: 409, message: 'That token has already been used.' });
	              } else {
	                //checking if the email is already being used
	                return connection.query("SELECT 1 FROM Persons WHERE Email = ? AND hex(ID) <> ?", [email, req.body.AuthToken]).then(function (rows) {
	                  if (rows.length) {
	                    return done(null, false, { statusCode: 409, message: 'That email has already been used.' });
	                  } else {
	                    //Passed all checks. Create user.
	                    var newPerson = new Person();
	                    newPerson.FirstName = req.body.FirstName;
	                    newPerson.LastName = req.body.LastName;
	                    newPerson.Email = email;
	                    newPerson.Role = 'USER';
	                    newPerson.Password = newPerson.generateHash(password);
	                    return connection.query("UPDATE Persons SET ? WHERE hex(ID) = ?", [newPerson, req.body.AuthToken]).then(function (rows) {
	                      newPerson.auth_id = req.body.AuthToken;
	                      return done(null, newPerson);
	                    });
	                  }
	                });
	              }
	            });
	          }
	        }).catch(function (error) {
	          return done(error);
	        });
	      });
	    });
	  }));

	  passport.use('local-login', new LocalStrategy({
	    usernameField: 'Email',
	    passwordField: 'Password',
	    passReqToCallback: true
	  }, function (req, email, password, done) {
	    Promise.using(getSqlConnection(), function (connection) {
	      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role, Password FROM Persons WHERE email = ?", [email]).then(function (rows) {
	        if (!rows.length) {
	          return done(null, false, { statusCode: 404, message: 'Invalid Credentials' });
	        }
	        var loginPerson = new Person();
	        loginPerson.Email = rows[0].Email;
	        loginPerson.Password = rows[0].Password;
	        if (!loginPerson.validPassword(password)) {
	          return done(null, false, { statusCode: 404, message: 'Invalid Credentials' });
	        }
	        loginPerson.auth_id = rows[0]['HEX(ID)'];
	        return done(null, loginPerson);
	      }).catch(function (error) {
	        return done(error);
	      });
	    });
	  }));
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bcrypt = __webpack_require__(12);

	var Person = function Person() {};

	Person.prototype.validPassword = function (password) {
	  return bcrypt.compareSync(password, this.Password);
	};

	Person.prototype.generateHash = function (pass) {
	  return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
	};

	module.exports = Person;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var configDB = __webpack_require__(7);
	var mysql = __webpack_require__(14);

	var pool = mysql.createPool(configDB.connectionData);

	function getSqlConnection() {
		return pool.getConnection().disposer(function (connection) {
			pool.releaseConnection(connection);
		});
	}

	module.exports = getSqlConnection;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("promise-mysql");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Persons = __webpack_require__(16);
	var TimeSheets = __webpack_require__(17);
	var signupEmail = __webpack_require__(19);
	var deletePerson = __webpack_require__(23);
	var transporter = __webpack_require__(20);
	var signupEmailMessage = __webpack_require__(22);

	module.exports = function (app, passport) {
	  app.get('/', function (req, res) {
	    res.sendFile('index.html', { root: process.env.PWD });
	  });

	  app.get('/timesheets', checkUserAuth, function (req, res, next) {
	    var timeSheets = new TimeSheets();
	    timeSheets.fetch(req, function (err, results) {
	      if (err) {
	        return res.sendStatus(500);
	      }
	      return res.status(200).send({ results: results.resultsArray, next: results.next, prev: results.prev });
	    });
	  });

	  app.post('/resendSignupEmail', checkAdminAuth, function (req, res, next) {
	    var message = signupEmailMessage(req.body.Email, req.body.Token);

	    transporter.sendMail(message, function (error, info) {
	      if (error) {
	        console.log(error);
	        return res.status(500).send({ message: 'Internal server error. Please try again.' });
	      } else {
	        return res.status(200).send({ message: 'Successful token creation' });
	      }
	    });
	  });

	  app.post('/tokenCreation', checkAdminAuth, function (req, res, next) {
	    signupEmail(req.body.Email, function (err, success, info) {
	      if (err) {
	        return res.status(500).send({ message: 'Internal server error. Please try again.' });
	      } else if (!success) {
	        return res.status(info.statusCode).send({ message: info.message });
	      } else {
	        return res.status(200).send({ message: 'Successful token creation' });
	      }
	    });
	  });

	  app.delete('/persons/:id', checkAdminAuth, function (req, res, next) {
	    deletePerson(req, function (err) {
	      if (err) {
	        return res.sendStatus(500);
	      }
	      return res.sendStatus(200);
	    });
	  });

	  app.get('/persons', checkAdminAuth, function (req, res) {
	    var persons = new Persons();
	    persons.fetch(req, function (err, results) {
	      if (err) {
	        return res.sendStatus(500);
	      }
	      return res.status(200).send(results);
	    });
	  });

	  app.get('/session', function (req, res) {
	    if (req.isAuthenticated()) {
	      res.status(200).send({ isAuthenticated: true, FirstName: req.user.FirstName, LastName: req.user.LastName, Role: req.user.Role });
	    } else {
	      res.status(200).send({ isAuthenticated: false });
	    }
	  });

	  //Wasn't orginally sending a message back with this but I think it attempts to parse the
	  //empty response and gets an error. Tried setting 'parse: false' on the client to no avail.
	  app.get('/logout', function (req, res) {
	    req.logout();
	    res.status(200).send({ message: 'You have successfully logged out.' });
	  });

	  app.post('/loginCreation', function (req, res, next) {
	    passport.authenticate('local-signup', function (err, person, info) {
	      if (err) {
	        return next(err);
	      }
	      if (!person) {
	        return res.status(info.statusCode).send({ message: info.message });
	      }
	      req.login(person, function (err) {
	        if (err) {
	          res.send(res, 500, 'Ups.');
	        } else {
	          return res.status(200).send({ FirstName: person.FirstName });
	        }
	      });
	    })(req, res, next);
	  });

	  app.post('/login', function (req, res, next) {
	    passport.authenticate('local-login', function (err, person, info) {
	      if (err) {
	        return next(err);
	      }
	      if (!person) {
	        return res.status(info.statusCode).send({ message: info.message });
	      }
	      req.login(person, function (err) {
	        if (err) {
	          res.send(res, 500, 'Ups.');
	        } else {
	          return res.status(200).send({ message: 'SUCCESS' });
	        }
	      });
	    })(req, res, next);
	  });

	  function checkAdminAuth(req, res, next) {
	    if (req.isAuthenticated()) {
	      if (req.user.Role === 'ADMIN') {
	        next();
	      } else {
	        res.sendStatus(403);
	      }
	    } else {
	      res.sendStatus(403);
	    }
	  }

	  function checkUserAuth(req, res, next) {
	    if (req.isAuthenticated()) {
	      if (req.user.Role === 'USER') {
	        next();
	      } else {
	        res.sendStatus(403);
	      }
	    } else {
	      res.sendStatus(403);
	    }
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(10);

	var getSqlConnection = __webpack_require__(13);

	var Persons = function Persons() {};

	Persons.prototype.fetch = function (req, done) {
	  if (req.query.verified === 'true') {
	    Promise.using(getSqlConnection(), function (connection) {
	      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons WHERE FirstName IS NOT NULL").then(function (results) {
	        var returnArray = cleanResults(results);
	        return done(null, returnArray);
	      }).catch(function (error) {
	        return done(error, null);
	      });
	    });
	  } else if (req.query.verified === 'false') {
	    Promise.using(getSqlConnection(), function (connection) {
	      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons WHERE FirstName IS NULL").then(function (results) {
	        var returnArray = cleanResults(results);
	        return done(null, returnArray);
	      }).catch(function (error) {
	        return done(error, null);
	      });
	    });
	  } else {
	    Promise.using(getSqlConnection(), function (connection) {
	      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons").then(function (results) {
	        var returnArray = cleanResults(results);
	        return done(null, returnArray);
	      }).catch(function (error) {
	        return done(error, null);
	      });
	    });
	  }

	  //Helper Function
	  function cleanResults(results) {
	    var returnArray = [];
	    for (var i = 0; i < results.length; i++) {
	      var Person = {};
	      Person.id = results[i]['HEX(ID)'];
	      Person.FirstName = results[i].FirstName;
	      Person.LastName = results[i].LastName;
	      Person.Email = results[i].Email;
	      Person.Role = results[i].Role;
	      returnArray.push(Person);
	    }
	    return returnArray;
	  }
	};

	module.exports = Persons;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var moment = __webpack_require__(18);
	var Promise = __webpack_require__(10);

	var getSqlConnection = __webpack_require__(13);

	var TimeSheets = function TimeSheets() {};

	TimeSheets.prototype.fetch = function (req, done) {
	  var wideSelectStartDate = moment(req.query.selectStartDate).subtract(1, 'M').format('YYYY-MM-DD');
	  var wideSelectEndDate = moment(req.query.selectEndDate).add(1, 'M').format('YYYY-MM-DD');
	  Promise.using(getSqlConnection(), function (connection) {
	    return connection.query("SELECT HEX(person_id), weekStartDate, mondayTime, tuesdayTime, wednesdayTime, thursdayTime, fridayTime, totalTime \
	    FROM TimeSheets WHERE (weekStartDate BETWEEN ? AND ?) AND HEX(person_id) = ?", [wideSelectStartDate, wideSelectEndDate, req.user['HEX(ID)']]).then(function (rows) {
	      var cleanedResults = cleanResults(rows);
	      return done(null, cleanedResults);
	    }).catch(function (error) {
	      return done(err, null);
	    });
	  });

	  //Helper Function
	  function cleanResults(results) {
	    var returnArray = [];
	    var next = false;
	    var prev = false;
	    var timeSelectorDateFound = false;

	    for (var i = 0; i < results.length; i++) {
	      if (moment(results[i].weekStartDate).isBefore(req.query.selectStartDate)) {
	        prev = true;
	        continue;
	      } else if (moment(results[i].weekStartDate).isAfter(req.query.selectEndDate)) {
	        next = true;
	        continue;
	      }

	      var timeSheet = {};
	      timeSheet.id = results[i]['HEX(person_id)'];
	      timeSheet.weekStartDate = results[i].weekStartDate;
	      timeSheet.mondayTime = results[i].mondayTime;
	      timeSheet.tuesdayTime = results[i].tuesdayTime;
	      timeSheet.wednesdayTime = results[i].wednesdayTime;
	      timeSheet.thursdayTime = results[i].thursdayTime;
	      timeSheet.fridayTime = results[i].fridayTime;
	      timeSheet.totalTime = results[i].totalTime;
	      returnArray.push(timeSheet);
	    }
	    return { resultsArray: returnArray, prev: prev, next: next };
	  }
	};

	module.exports = TimeSheets;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(10);

	var getSqlConnection = __webpack_require__(13);
	var transporter = __webpack_require__(20);
	var signupEmailMessage = __webpack_require__(22);

	var sendSignUpEmailMail = function sendSignUpEmailMail(email, done) {
	  Promise.using(getSqlConnection(), function (connection) {
	    return connection.query("SELECT 1 FROM Persons WHERE Email = ?", [email]).then(function (results) {
	      if (results.length) {
	        return done(null, false, { statusCode: 409, message: 'That email is already in use.' });
	      }
	      return connection.query("SELECT REPLACE(UUID(),'-','') as token").then(function (results) {
	        var token = results[0].token;
	        return connection.query("INSERT INTO Persons Values(UNHEX(?), null, null, ?, null, null)", [token, email]).then(function (results) {
	          var message = signupEmailMessage(email, token);
	          transporter.sendMail(message, function (error, info) {
	            if (error) {
	              console.log(error);
	            } else {
	              console.log('Sent: ' + info.response);
	            }
	          });
	          return done(null, true);
	        });
	      });
	    }).catch(function (error) {
	      console.log(error);
	      done(error);
	    });
	  });
	};

	module.exports = sendSignUpEmailMail;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nodemailer = __webpack_require__(21);

	module.exports = nodemailer.createTransport({
	  service: 'Mailgun',
	  auth: {
	    user: 'postmaster@sandbox30cd4bd1b82d429d89c3cb4e00df032a.mailgun.org',
	    pass: 'cf720a8ce58aa1658aff323721ba382d'
	  }
	});

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("nodemailer");

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	var signupEmailMessage = function signupEmailMessage(email, token) {
	  var message = {
	    from: 'elevationHealthcareSignup@elevationhealthcare.com',
	    to: email,
	    subject: 'Elevation Healthcare - Authentication Token',
	    text: "You're receiving this message as your employer has added you \
	    to their time sheet application. Below you will find an authentication token \
	    created just for you. With that, please do not share this token with anyone as it is \
	    only good for one use. Please follow the link below to create your account \
	    and get started! \n\n \
	    Authentication Token: " + token + "\n \
	    Account Creation URL: http://tsademo.clwproductions.com/#CreateAccount \n\n \
	    NOTE: This email was automatically generated so please do not reply. If \
	    you seek help contact your manager."
	  };

	  return message;
	};

	module.exports = signupEmailMessage;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(10);

	var getSqlConnection = __webpack_require__(13);

	var deletePerson = function deletePerson(req, done) {
		Promise.using(getSqlConnection(), function (connection) {
			return connection.query("DELETE FROM Persons WHERE HEX(ID) = ?", [req.params.id]).then(function (results) {
				return done(null);
			}).catch(function (error) {
				done(error);
			});
		});
	};

	module.exports = deletePerson;

/***/ }
/******/ ]);