var bcrypt = require('bcrypt');
var Person = require('../serverObjects/person');
var mysql = require('mysql');

var connectionData = {
  host: 'localhost',
  user: 'your_mysql_user', //<-- Your MySQL user
  password: 'your_mysql_password', //<-- Your MySQL user password
  database: 'timeSheetApplication'
};

var connection = mysql.createConnection(connectionData);

var users = {
  user1: {
    FirstName: 'John',
    LastName: 'Smith',
    Email: 'jsmith@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  },
  user2: {
    FirstName: 'Abraham',
    LastName: 'Lincoln',
    Email: 'alincoln@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  },
  user3: {
    FirstName: 'George',
    LastName: 'Washington',
    Email: 'gwashington@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  },
  user4: {
    FirstName: 'Annie',
    LastName: 'Trainor',
    Email: 'atrainor@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  },
  user5: {
    FirstName: 'Julie',
    LastName: 'Henry',
    Email: 'jhenry@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  }
}

var UnusedTokens = {
  token1: {
    Email: 'bthorton@gmail.com'
  },
  token2: {
    Email: 'jrose@gmail.com'
  },
  token3: {
    Email: 'fsinatra@gmail.com'
  }
}

//Insert users
console.log('Creating users...');
var person = new Person();
for (var userKey in users) {
  if (!users.hasOwnProperty(userKey)) continue;
  var user = users[userKey];
  var Password = person.generateHash(user.Password);
  connection.query("INSERT INTO Persons Values(UNHEX(REPLACE(UUID(),'-','')), ?, ?, ?, ?, ?)", [user.LastName, user.FirstName, user.Email, user.Role, Password],function(err, results) {
      if(err) console.log(err);
      console.log('User created...');
  });
}
console.log("here");
//Insert invalid users
for (var tokenKey in UnusedTokens) {
  if (!UnusedTokens.hasOwnProperty(tokenKey)) continue;
  var token = UnusedTokens[tokenKey];
  connection.query("INSERT INTO Persons Values(UNHEX(REPLACE(UUID(),'-','')), null, null, ?, null, null)", [token.Email],function(err, results) {
      if(err) console.log(err);
      console.log('Invalidated user created...');
  });
}

connection.end();