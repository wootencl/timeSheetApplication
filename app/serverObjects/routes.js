'use strict';

module.exports = function(app, passport) {
  app.get('/', function (req, res) {
    res.sendFile( 'index.html', { root: process.env.PWD});
  });

  app.get('/session', function (req, res) {
    if (req.isAuthenticated()) {
      res.status(200).send({ isAuthenticated: true, FirstName: req.user.FirstName, LastName: req.user.LastName, Role: req.user.Role });
    } else {
      res.status(200).send({ isAuthenticated: false });
    }
  });

  //Wasn't orginally sending a message back with this but I think it attempts to parse the
  //empty response and gets an error. Tried setting 'parse: false' on the client to no avail.
  app.get('/logout', function (req, res) {
    req.logout();
    res.status(200).send({ message: 'You have successfully logged out.' });
  });

  app.post('/loginCreation', function(req, res, next) {
    passport.authenticate('local-signup', function(err, person, info) {
      if (err) { return next(err); }
      if (!person) {
        return res.status(info.statusCode).send({ message: info.message });
      }
      req.login(person, function(err) {
        if (err) {
          res.send(res, 500, 'Ups.');
        } else {
          return res.status(200).send( { FirstName: person.FirstName } );
        }
      });
    })(req, res, next);
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, person, info) {
      if (err) { return next(err); }
      if (!person) {
        return res.status(info.statusCode).send({ message: info.message });
      }
      req.login(person, function(err) {
        if (err) {
          res.send(res, 500, 'Ups.');
        } else {
          return res.status(200).send( { message: 'SUCCESS' } );
        }
      });
    })(req, res, next);
  });
};