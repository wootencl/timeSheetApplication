'use strict';
var Promise = require("bluebird");

var getSqlConnection = require('../serverConfig/databaseConnection');
var transporter = require('../serverConfig/emailSetup');
var signupEmailMessage = require('./signupEmailMessage');

var sendSignUpEmailMail = function(email, done) {
  Promise.using(getSqlConnection(), function(connection) {
    return connection.query("SELECT 1 FROM Persons WHERE Email = ?", [email]).then(function(results) {
      if (results.length) {
        return done(null, false, {statusCode: 409, message: 'That email is already in use.'})
      }
      return connection.query("SELECT REPLACE(UUID(),'-','') as token").then(function(results) {
        var token = results[0].token;
        return connection.query("INSERT INTO Persons Values(UNHEX(?), null, null, ?, null, null)", [token, email]).then(function(results) {
          var message = signupEmailMessage(email, token);
          transporter.sendMail(message, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Sent: ' + info.response);
            }
          });
          return done(null, true);
        })
      })
    }).catch(function(error) {
      console.log(error);
      done(error);
    });
  });
}

module.exports = sendSignUpEmailMail;