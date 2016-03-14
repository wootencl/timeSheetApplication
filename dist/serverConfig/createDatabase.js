var mysql = require('mysql');
var dbconfig = require('database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.tableName + '` ( \
    `ID` BINARY(16) NOT NULL, \
    `FirstName` VARCHAR(225), \
    `LastName` VARCHAR(225), \
    `Email` VARCHAR(225), \
    `Role` VARCHAR(225), \
    `Password` CHAR(60), \
    PRIMARY KEY (`ID`) \
)');
console.log('Database Created');

var generatedID = connection.query("SELECT REPLACE(UUID(),'-','')");
connection.query('INSERT INTO Persons Values( UNHEX(' + generatedID + '), null, null, null, null, null)');
console.log('Your generated ID: ' + generatedID);

connection.end();