var signupEmailMessage = function(email, token) {
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