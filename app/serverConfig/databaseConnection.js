var configDB = require('./database.js');
var mysql = require('promise-mysql');

var pool = mysql.createPool(configDB.connectionData);

function getSqlConnection() {
	return pool.getConnection().disposer(function(connection) {
		pool.releaseConnection(connection);
	});
}

module.exports = getSqlConnection;