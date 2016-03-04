'use strict';

module.exports = function(app, passport) {
  app.get('/', function (req, res) {
    res.sendFile( 'index.html', { root: process.env.PWD});
  });

  app.post('/loginCreation', function(req, res, next) {
    passport.authenticate('local-signup', function(err, person, info) {
      if (err) { return next(err); }
      if (!person) {
        return res.status(info.statusCode).send({ message: info.message });
      }
      console.log("here");
      return res.status(200).send( { FirstName: person.FirstName } );
    })(req, res, next);
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, person, info) {
      if (err) { return next(err); }
      if (!person) {
        return res.status(info.statusCode).send({ message: info.message });
      }
      return res.status(200).send( { message: 'SUCCESS' } );
    })(req, res, next);
  });
};