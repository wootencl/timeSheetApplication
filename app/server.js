// NOTES:
// - Tutorial: https://scotch.io/tutorials/easy-node-authentication-setup-and-local#application-setup-server-js

'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8081;
var passport = require('passport');
var flash = require('connect-flash');
var mysql = require('mysql');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/templates',  express.static(__dirname + '/templates'));

var configDB = require('./serverConfig/database.js');

//Connecting to the database
var connection = mysql.createConnection(configDB.connectionData);
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
require('./serverConfig/passport')(passport, connection);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport setup
app.use(session({ secret: 'E4393BD8F59EA85B3BC912CF4772E',
                  saveUninitialized: true,
                  resave: true,
                  cookie: { secure: true }}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./serverObjects/routes.js')(app, passport);

var server = app.listen(port, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});