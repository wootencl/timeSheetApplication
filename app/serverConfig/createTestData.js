var bcrypt = require('bcrypt');
var Person = require('../serverObjects/person');
var mysql = require('mysql');

var connectionData = {
  host: 'localhost',
  user: 'your_mysqluser', //<-- Your MySQL user
  password: 'your_mysqluser_password', //<-- Your MySQL user password
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
  token: {
    Email: 'bthorton@gmail.com'
  },
  token: {
    Email: 'jrose@gmail.com'
  },
  token: {
    Email: 'fsinatra@gmail.com'
  }
}

//Insert users
console.log('Creating users...');
for (var userKey in users) {
  if (!users.hasOwnProperty(userKey)) continue;
  var user = users[userKey];
  connection.query("SELECT REPLACE(UUID(),'-','') AS generatedID", function(err, results) {
    if (err) { console.log(err) };
    var generatedID = results[0].generatedID;
    connection.query("INSERT INTO Persons Values( UNHEX('" + generatedID + "'), null, null, null, null, null)", function(err, results) {
      if (err) console.log(err);
      var person = new Person();
      person.FirstName = user.FirstName;
      person.LastName = user.LastName;
      person.Email = user.Email;
      person.Role = user.Role;
      person.Password = person.generateHash(user.Password);
      console.log(person);
      connection.query("UPDATE Persons SET ? WHERE hex(ID) = ?", [person, generatedID]);
      console.log('User created...');
    });
  });
}
