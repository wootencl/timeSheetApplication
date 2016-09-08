'use strict';
var Promise = require("bluebird");

var getSqlConnection = require('../serverConfig/databaseConnection');

var deletePerson = function(req, done) {
	Promise.using(getSqlConnection(), function(connection) {
		return connection.query("DELETE FROM Persons WHERE HEX(ID) = ?" , [req.params.id]).then(function(results) {
			return done(null);
		}).catch(function(error) {
			done(error);
		})
	});
}

module.exports = deletePerson;