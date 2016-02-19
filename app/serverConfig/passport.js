'use strict';

var LocalStrategy = require('passport-local').Strategy;

var User = require('../serverObjects/person');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    //async. leftovers from the tutorial
    process.nextTick(function() {
      //checking if the authenticationToken exists
      connection.query("SELECT 1 FROM Persons WHERE hex(ID) = ?", [req.body.AuthToken], function(err, results) {
        if (err) {
          return done(err);
        }
        if (results.length) {
          return done(null, false, req.flash('signupMessage', 'That token does not seem to exist.'));
        }
      });
      //checking if the token has already been used.
      connection.query("SELECT 1 FROM Persons WHERE hex(ID) = ? AND Email is NULL", [req.body.AuthToken], function(err, results) {
        if (err) {
          return done(err);
        }
        if (results.length) {
          return done(null, false, req.flash('signupMessage', 'That token has already been used.'))
        }
      });
      //checking if the email is already being used
      connection.query("SELECT 1 FROM Persons WHERE Email = ?", [email], function(err, results) {
        if (err) {
          return done(err);
        }
        if (results.length) {
          return done(null, false, req.flash('signupMessage', 'That email has already been used.'))
        }
      });
      //Passed all checks. Create user.
      var newPerson = new Person();
      newPerson.FirstName = req.body.firstName;
      newPerson.LastName = req.body.lastName;
      newPerson.Email = email;
      newPerson.Role = 'USER';
      newPerson.Password = newPerson.generateHash(password);

      connection.query("UPDATE Persons SET ? WHERE hex(ID) = ?", [newPerson, req.body.AuthToken], function(err, results) {
        if (err) {
          return done(err);
        } else {
          return done(null, newPerson);
        }
      });
    });
  }));
};