var deletePerson = function(req, connection, done) {
  connection.query("DELETE FROM Persons WHERE HEX(ID) = ?" , [req.params.id], function(err, results) {
    if (err) {
      return done(err)
    }
    return done(null);
  });
}

module.exports = deletePerson;