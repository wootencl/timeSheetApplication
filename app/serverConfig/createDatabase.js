var mysql = require('mysql');
var dbconfig = require('./database');

var connection = mysql.createConnection(dbconfig.connectionData);

connection.query('CREATE DATABASE IF NOT EXISTS ' + dbconfig.database);
console.log('Database created...');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`Persons` ( \
    `ID` BINARY(16) NOT NULL, \
    `FirstName` VARCHAR(225), \
    `LastName` VARCHAR(225), \
    `Email` VARCHAR(225), \
    `Role` VARCHAR(225), \
    `Password` CHAR(60), \
    PRIMARY KEY (`ID`) \
)');
console.log('Persons table created...');

//console.log('TimeSheets table created');

connection.query('USE `' + dbconfig.database + '`');
connection.query("SELECT REPLACE(UUID(),'-','') AS generatedID", function(err, results) {
  if (err) { console.log(err) };
  var generatedID = results[0].generatedID;
  connection.query("INSERT INTO Persons Values( UNHEX('" + generatedID + "'), null, null, null, null, null)");
  console.log('Person created...');
  console.log('Your generated authentication token: ' + generatedID);
  connection.end();
});

// You'll also want to add a 'database.js' in this same directory. The file should contain
// something like this:
// module.exports = {
//   'connectionData' : {
//     'host' : 'localhost',
//     'user' : 'your_mysql_user',
//     'password' : 'your_mysql_password'
//   },
//   'database' : 'timeSheetApplication'
// };