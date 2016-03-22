var Person = require('./person');

var Persons = function(connection){
  this.connection = connection;
};

Persons.prototype.fetch = function(callback) {
  this.connection.query("SELECT HEX(ID), LastName, FirstName, Email FROM PERSONS", function(err, results) {
    if (err) {
      return callback(err, null)
    }
    var returnArray = [];
    for (var i=0 ; i<results.length ; i++) {
      var Person = {};
      Person.id = results[i]['HEX(ID)'];
      Person.FirstName = results[i].FirstName;
      Person.LastName = results[i].LastName;
      Person.Email = results[i].Email;
      returnArray.push(Person);
    }
    return callback(null, returnArray);
  });
};

module.exports = Persons;