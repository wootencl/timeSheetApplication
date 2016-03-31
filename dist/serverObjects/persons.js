var Persons = function(connection){
  this.connection = connection;
};

Persons.prototype.fetch = function(req, callback) {
  if (req.query.verified === 'true') {
    this.connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons WHERE FirstName IS NOT NULL", function(err, results) {
      if (err) {
        return callback(err, null)
      }
      var returnArray = cleanResults(results);
      return callback(null, returnArray);
    });
  } else if (req.query.verified === 'false') {
    this.connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons WHERE FirstName IS NULL", function(err, results) {
      if (err) {
        return callback(err, null)
      }
      var returnArray = cleanResults(results);
      return callback(null, returnArray);
    });
  } else {
    this.connection.query("SELECT HEX(ID), LastName, FirstName, Email, Role FROM Persons", function(err, results) {
      if (err) {
        return callback(err, null)
      }
      var returnArray = cleanResults(results);
      return callback(null, returnArray);
    });
  }

  //Helper Function
  function cleanResults(results) {
    var returnArray = [];
    for (var i=0 ; i<results.length ; i++) {
      var Person = {};
      Person.id = results[i]['HEX(ID)'];
      Person.FirstName = results[i].FirstName;
      Person.LastName = results[i].LastName;
      Person.Email = results[i].Email;
      Person.Role = results[i].Role;
      returnArray.push(Person);
    }
    return returnArray;
  }
};

module.exports = Persons;