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
      return res.status(200).send( { FirstName: person.FirstName } );
    })(req, res, next);
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, person, info) {
      if (err) { return next(err); }
      if (!person) {
        return res.status(info.statusCode).send({ message: info.message });
      }
      req.session.auth_id = person.auth_id;
      res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      return res.status(200).send( { message: 'SUCCESS' } );
    })(req, res, next);
  });

  function authUser(req, res, next) {
    if(!req.session.auth_id) {
      return res.status(401).send({ message: 'You are unauthorized.' });
    } else {
      res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      next();
    }
  }
};