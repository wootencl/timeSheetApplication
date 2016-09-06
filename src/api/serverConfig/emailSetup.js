var nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: 'postmaster@sandbox30cd4bd1b82d429d89c3cb4e00df032a.mailgun.org',
    pass: 'cf720a8ce58aa1658aff323721ba382d'
  }
});
