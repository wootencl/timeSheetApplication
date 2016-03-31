var transporter = require('../serverConfig/emailSetup');

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