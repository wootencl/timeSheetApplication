var mysql = require('mysql');

var databaseName = 'timeSheetApplication';
var connectionData = {
  host: 'localhost',
  user: 'your_mysql_user', //<-- Your MySQL user
  password: 'your_mysql_password' //<-- Your MySQL user password
};

var connection = mysql.createConnection(connectionData);

connection.query('CREATE DATABASE IF NOT EXISTS ' + databaseName);
console.log('Database created...');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + databaseName + '`.`Persons` ( \
    `ID` BINARY(16) NOT NULL, \
    `FirstName` VARCHAR(225), \
    `LastName` VARCHAR(225), \
    `Email` VARCHAR(225), \
    `Role` VARCHAR(225), \
    `Password` CHAR(60), \
    PRIMARY KEY (`ID`) \
    UNIQUE (`Email`) \
)');
console.log('Persons table created...');

//console.log('TimeSheets table created');

connection.query('USE `' + databaseName + '`');


// You'll also want to add a 'database.js' in this same directory. The file should contain
// something like this:
// module.exports = {
//   'connectionData' : {
//     'host' : 'localhost',
//     'user' : 'your_mysql_user',
//     'password' : 'your_mysql_password',
//     'database' : 'timeSheetApplication'
// };