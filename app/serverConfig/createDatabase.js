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

connection.query()

console.log('Database Created')

connection.end();