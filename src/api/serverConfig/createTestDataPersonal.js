var bcrypt = require('bcrypt');
var Person = require('../serverObjects/person');
var mysql = require('mysql');
var moment = require('moment');

var connectionData = {
  host: 'localhost',
  user: 'root', //<-- Your MySQL user
  password: 'Logos$1b', //<-- Your MySQL user password
  database: 'timeSheetApplication'
};

var connection = mysql.createConnection(connectionData);

var users = {
  demoadmin: {
    FirstName: 'Demo',
    LastName: 'Admin',
    Email: 'demoadmin@gmail.com',
    Role: 'ADMIN',
    Password: 'Password123'
  },
  user1: {
    FirstName: 'Abraham',
    LastName: 'Lincoln',
    Email: 'alincoln@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  },
  user2: {
    FirstName: 'George',
    LastName: 'Washington',
    Email: 'gwashington@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  },
  user3: {
    FirstName: 'Annie',
    LastName: 'Trainor',
    Email: 'atrainor@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  },
  user4: {
    FirstName: 'Julie',
    LastName: 'Henry',
    Email: 'jhenry@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  }
}

var usersWithTimeSheets = {
  user1: {
    FirstName: 'John',
    LastName: 'Smith',
    Email: 'jsmith@gmail.com',
    Role: 'USER',
    Password: 'Password123'
  },
  user2: {
    FirstName: 'Demo',
    LastName: 'User',
    Email: 'demouser@gmail.com',
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

//Person used for password hashing
var person = new Person();
var insertions = 3;

function createUsers() {
  console.log('Creating users...');
  var array = [];
  var i = 0;
  for (var userKey in users) {
    if (!users.hasOwnProperty(userKey)) continue;
    array[i] = userKey;
    i++;
  }
  insert(--i);

  function insert(i) {
    if (i >= 0) {
      var user = users[array[i]];
      var Password = person.generateHash(user.Password);
      connection.query("INSERT INTO Persons Values(UNHEX(REPLACE(UUID(),'-','')), ?, ?, ?, ?, ?)", [user.FirstName, user.LastName, user.Email, user.Role, Password],function(err, results) {
          if(err) {
            console.log(err);
            return done();
          }
          console.log('User created...');
          insert(--i);
      });
    } else {
      done();
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createUsersWithTimeSheets() {
  console.log('Creating users with timesheets...');
  var array = [];
  var i = 0;
  for (var userKey in usersWithTimeSheets) {
    if (!usersWithTimeSheets.hasOwnProperty(userKey)) continue;
    array[i] = userKey;
    i++;
  }
  insert(--i);

  function insert(i) {
    if (i >= 0) {
      var user = usersWithTimeSheets[array[i]];
      var Password = person.generateHash(user.Password);
      connection.query("SELECT REPLACE(UUID(),'-','') as token", function(err, results) {
        if(err) {
          console.log(err);
          return done();
        }
        var token = results[0].token;
        connection.query("INSERT INTO Persons Values(UNHEX(?), ?, ?, ?, ?, ?)", [token, user.FirstName, user.LastName, user.Email, user.Role, Password], function(err, results) {
          if(err) {
            if(err.code === 'ER_DUP_ENTRY') { //Already exists in DB
              connection.query("SELECT HEX(ID) FROM Persons WHERE Email = ?", [user.Email], function (err, results) {
                token = results[0]['HEX(ID)'];
                insertTimeSheet(token);
              });
            } else {
              console.log(err.code);
              return done();
            }
          } else {
            insertTimeSheet(token);
          }
        });
      });
    } else {
      done();
    }
  }
  function insertTimeSheet(token) {
    var weekMonday = moment(moment().startOf('isoWeek')).format('YYYY-MM-DD');
    for (var j=7; j>0; j--) {
      var m = getRandomInt(0,16),
      t = getRandomInt(0,16),
      w = getRandomInt(0,16),
      th = getRandomInt(0,16),
      f = getRandomInt(0,16),
      total = m+t+w+th+f;

      console.log('Time sheet created...');
      connection.query("INSERT IGNORE INTO TimeSheets Values(UNHEX(?), ?, ?, ?, ?, ?, ?, ?)", [token, weekMonday, m, t, w, th, f, total], function(err, results) {
        if(err) {
          console.log(err);
          return done();
        }
      });
      weekMonday = moment(weekMonday).subtract(1, 'w').format('YYYY-MM-DD');
    }
    if (j === 0) {
      insert(--i);
    }
  }
}

function createInvalidUsers() {
  console.log('Creating invalid users...');
  var array = [];
  var i = 0;
  for (var userKey in UnusedTokens) {
    if (!UnusedTokens.hasOwnProperty(userKey)) continue;
    array[i] = userKey;
    i++;
  }
  insert(--i);

  function insert(i) {
    if (i >= 0) {
      var token = UnusedTokens[array[i]];
      connection.query("INSERT INTO Persons Values(UNHEX(REPLACE(UUID(),'-','')), null, null, ?, null, null)", [token.Email],function(err, results) {
          if(err) {
            console.log(err);
            return done();
          }
          console.log('Invalidated user created...');
          insert(--i);
      });
    } else {
      done();
    }
  }
}

createUsers();
createUsersWithTimeSheets();
createInvalidUsers();

function done() {
  insertions--;
  if (insertions === 0) {
    connection.end();
  }
}