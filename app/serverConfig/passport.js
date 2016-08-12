'use strict';
var LocalStrategy = require('passport-local').Strategy;
var Promise = require("bluebird");

var Person = require('../serverObjects/person');
var getSqlConnection = require('./databaseConnection');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.auth_id);
  });

  passport.deserializeUser(function(id, done) {
    Promise.using(getSqlConnection(), function(connection) {
      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons WHERE hex(ID) = ?", id).then(function(results) {
        done(null, results[0]);
      }).catch(function(error) {
        done(err, null);
      });
    })
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'Email',
    passwordField: 'Password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      Promise.using(getSqlConnection(), function(connection) {
        //checking if the authenticationToken exists
        connection.query("SELECT 1 FROM Persons WHERE hex(ID) = ?", [req.body.AuthToken]).then(function(rows) {
          if (rows.length === 0) {
            return done(null, false, {statusCode: 404, message: 'That token does not seem to exist.'});
          } else {
            //checking if the token has already been used.
            return connection.query("SELECT 1 FROM Persons WHERE hex(ID) = ? AND Password is NOT NULL", [req.body.AuthToken]).then(function(rows) {
              if (rows.length) {
                return done(null, false, {statusCode: 409, message: 'That token has already been used.'})
              } else {
                //checking if the email is already being used
                return connection.query("SELECT 1 FROM Persons WHERE Email = ? AND hex(ID) <> ?", [email, req.body.AuthToken]).then(function(rows) {
                  if (rows.length) {
                    return done(null, false, {statusCode: 409, message: 'That email has already been used.'})
                  } else {
                    //Passed all checks. Create user.
                    var newPerson = new Person();
                    newPerson.FirstName = req.body.FirstName;
                    newPerson.LastName = req.body.LastName;
                    newPerson.Email = email;
                    newPerson.Role = 'USER';
                    newPerson.Password = newPerson.generateHash(password);
                    return connection.query("UPDATE Persons SET ? WHERE hex(ID) = ?", [newPerson, req.body.AuthToken]).then(function(rows) {
                      newPerson.auth_id = req.body.AuthToken;
                      return done(null, newPerson);
                    })
                  }
                })
              }
            })
          }
        }).catch(function(error) {
          return done(error);
        });
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'Email',
    passwordField: 'Password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    Promise.using(getSqlConnection(), function(connection) {
      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role, Password FROM Persons WHERE email = ?", [email]).then(function(rows) {
        if (!rows.length) {
          return done(null, false, {statusCode: 404, message: 'Invalid Credentials'});
        }
        var loginPerson = new Person();
        loginPerson.Email = rows[0].Email;
        loginPerson.Password = rows[0].Password;
        if (!loginPerson.validPassword(password))
        {
          return done(null, false, {statusCode: 404, message: 'Invalid Credentials'});
        }
        loginPerson.auth_id = rows[0]['HEX(ID)'];
        return done(null, loginPerson);
      }).catch(function(error) {
        return done(error);
      })
    });
  }));
};