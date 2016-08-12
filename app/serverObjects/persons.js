'use strict';
var Promise = require("bluebird");

var getSqlConnection = require('../serverConfig/databaseConnection');

var Persons = function(){
};

Persons.prototype.fetch = function(req, done) {
  if (req.query.verified === 'true') {
    Promise.using(getSqlConnection(), function(connection) {
      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons WHERE FirstName IS NOT NULL").then(function(results) {
        var returnArray = cleanResults(results);
        return done(null, returnArray);
      }).catch(function(error) {
        return done(error, null);
      });
    });
  } else if (req.query.verified === 'false') {
    Promise.using(getSqlConnection(), function(connection) {
      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons WHERE FirstName IS NULL").then(function(results) {
        var returnArray = cleanResults(results);
        return done(null, returnArray);
      }).catch(function(error) {
        return done(error, null);
      });
    });
  } else {
    Promise.using(getSqlConnection(), function(connection) {
      return connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons").then(function(results) {
        var returnArray = cleanResults(results);
        return done(null, returnArray);
      }).catch(function(error) {
        return done(error, null);
      });
    });
  }

  //Helper Function
  function cleanResults(results) {
    var returnArray = [];
    for (var i=0 ; i<results.length ; i++) {
      var Person = {};
      Person.id = results[i]['HEX(ID)'];
      Person.FirstName = results[i].FirstName;
      Person.LastName = results[i].LastName;
      Person.Email = results[i].Email;
      Person.Role = results[i].Role;
      returnArray.push(Person);
    }
    return returnArray;
  }
};

module.exports = Persons;