'use strict';

module.exports = function(app, passport) {
  app.get('/', function (req, res) {
    res.sendFile( 'index.html', { root: process.env.PWD});
  });

  app.post('/loginCreation', function (req, res) {
    console.log("hello");
  });
};