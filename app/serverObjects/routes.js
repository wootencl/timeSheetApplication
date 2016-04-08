'use strict';

var Persons = require('../serverObjects/persons');
var TimeSheets = require('../serverObjects/TimeSheets');
var signupEmail = require('./signupEmail');
var deletePerson = require('./deletePerson');
var transporter = require('../serverConfig/emailSetup');
var signupEmailMessage = require('./signupEmailMessage');

module.exports = function(app, passport, connection) {
  app.get('/', function (req, res) {
    res.sendFile( 'index.html', { root: process.env.PWD});
  });

  app.get('/timesheets', checkUserAuth, function(req, res, next) {
    var timeSheets = new TimeSheets(connection);
    timeSheets.fetch(req, function(err, results) {
      if (err) {
        return res.sendStatus(500);
      }
      return res.status(200).send(results);
    });
  });

  app.post('/resendSignupEmail', checkAdminAuth, function(req, res, next) {
    var message = signupEmailMessage(req.body.Email, req.body.Token);

    transporter.sendMail(message, function(error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error. Please try again.'});
      } else {
        return res.status(200).send({message: 'Successful token creation'});
      }
    });
  });

  app.post('/tokenCreation', checkAdminAuth, function(req, res, next) {
    signupEmail(req.body.Email, connection, function(err, success, info) {
      if (err) {
        return res.status(500).send({ message: 'Internal server error. Please try again.'});
      } else if (!success) {
        return res.status(info.statusCode).send({ message: info.message });
      } else {
        return res.status(200).send({message: 'Successful token creation'});
      }
    });
  });

  app.delete('/persons/:id', checkAdminAuth, function(req, res, next) {
    deletePerson(req, connection, function(err) {
      if (err) {
        return res.sendStatus(500);
      }
      return res.sendStatus(200);
    });
  });

  app.get('/persons', checkAdminAuth, function(req,res) {
    var persons = new Persons(connection);
    persons.fetch(req, function(err, results) {
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

  app.post('/loginCreation', function(req, res, next) {
    passport.authenticate('local-signup', function(err, person, info) {
      if (err) { return next(err); }
      if (!person) {
        return res.status(info.statusCode).send({ message: info.message });
      }
      req.login(person, function(err) {
        if (err) {
          res.send(res, 500, 'Ups.');
        } else {
          return res.status(200).send( { FirstName: person.FirstName } );
        }
      });
    })(req, res, next);
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, person, info) {
      if (err) { return next(err); }
      if (!person) {
        return res.status(info.statusCode).send({ message: info.message });
      }
      req.login(person, function(err) {
        if (err) {
          res.send(res, 500, 'Ups.');
        } else {
          return res.status(200).send( { message: 'SUCCESS' } );
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