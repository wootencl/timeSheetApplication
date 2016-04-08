var transporter = require('../serverConfig/emailSetup');
var signupEmailMessage = require('./signupEmailMessage');

var sendSignUpEmailMail = function(email, connection, done) {
  connection.query("SELECT 1 FROM Persons WHERE Email = ?", [email], function(err, results) {
    if (err) {
      return done(err);
    } else if (results.length) {
      return done(null, false, {statusCode: 409, message: 'That email is already in use.'})
    }
    connection.query("SELECT REPLACE(UUID(),'-','') as token", function(err, results) {
      if (err) {
        console.log(err);
        return done(err);
      }
      var token = results[0].token;
      connection.query("INSERT INTO Persons Values(UNHEX(?), null, null, ?, null, null)", [token, email], function(err, results) {
        if (err) {
          console.log(err);
          return done(err);
        }
        var message = signupEmailMessage(email, token);

        transporter.sendMail(message, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Sent: ' + info.response);
          }
        });

        return done(null, true);
      });
    });
  });
}

module.exports = sendSignUpEmailMail;