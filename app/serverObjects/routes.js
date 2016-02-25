'use strict';

module.exports = function(app, passport) {
  app.get('/', function (req, res) {
    res.sendFile( 'index.html', { root: process.env.PWD});
  });

  app.post('/loginCreation', function(req, res, next) {
    passport.authenticate('local-signup', function(err, person) {
      console.log(req.flash('signupMessage'));
      console.log(person);
      if (err) { return next(err); }
    })(req, res, next);
  });
};