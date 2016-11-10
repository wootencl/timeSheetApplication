// NOTES:
// - Tutorial: https://scotch.io/tutorials/easy-node-authentication-setup-and-local#application-setup-server-js

'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

console.log(__dirname);
app.use(express.static(__dirname + '/../app'));
app.use('/bower_components',  express.static(__dirname + '/../app/bower_components'));

var configDB = require('./serverConfig/database.js');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport setup
app.use(session({ secret: 'E4393BD8F59EA85B3BC912CF4772E',
                  saveUninitialized: true,
                  resave: true,
                  cookie: { httpOnly: true, maxAge: 60*60*1000 }
                }));
app.use(passport.initialize());
app.use(passport.session());

//passport setup
require('./serverConfig/passport')(passport);
//routes
require('./serverObjects/routes.js')(app, passport);

var server = app.listen(port, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});