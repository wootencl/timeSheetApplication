'use strict';
var LocalStrategy = require('passport-local').Strategy;

var Person = require('../serverObjects/person');

module.exports = function(passport, connection) {
  passport.serializeUser(function(user, done) {
    done(null, user.auth_id);
  });

  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM Persons WHERE hex(ID) = ?", id, function(err, results) {
      done(err, results[0]);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'Email',
    passwordField: 'Password',
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
        if (results.length === 0) {
          return done(null, false, {statusCode: 404, message: 'That token does not seem to exist.'});
        } else {
          //checking if the token has already been used.
          connection.query("SELECT 1 FROM Persons WHERE hex(ID) = ? AND Email is NOT NULL", [req.body.AuthToken], function(err, results) {
            if (err) {
              return done(err);
            }
            if (results.length) {
              return done(null, false, {statusCode: 409, message: 'That token has already been used.'})
            } else {
              //checking if the email is already being used
              connection.query("SELECT 1 FROM Persons WHERE Email = ?", [email], function(err, results) {
                if (err) {
                  return done(err);
                }
                if (results.length) {
                  return done(null, false, {statusCode: 409, message: 'That email has already been used.'})
                } else {
                  //Passed all checks. Create user.
                  var newPerson = new Person();
                  newPerson.FirstName = req.body.FirstName;
                  newPerson.LastName = req.body.LastName;
                  newPerson.Email = email;
                  newPerson.Role = 'USER';
                  newPerson.Password = newPerson.generateHash(password);
                  connection.query("UPDATE Persons SET ? WHERE hex(ID) = ?", [newPerson, req.body.AuthToken], function(err, results) {
                    if (err) {
                      return done(err);
                    } else {
                      newPerson.auth_id = req.body.AuthToken;
                      return done(null, newPerson);
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'Email',
    passwordField: 'Password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role, Password FROM Persons WHERE email = ?", [email], function(err, rows) {
      if (err) { return done(err); }
      if (!rows.length) {
        return done(null, false, {statusCode: 404, message: 'Not a valid user'});
      }

      var loginPerson = new Person();
      loginPerson.Email = rows[0].Email;
      loginPerson.Password = rows[0].Password;
      if (!loginPerson.validPassword(password))
      {
        return done(null, false, {statusCode: 404, message: 'Incorrect Password'});
      }
      loginPerson.auth_id = rows[0]['HEX(ID)'];
      return done(null, loginPerson);
    });
  }));
};