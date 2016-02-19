'use strict';

var bcrypt = require('bcrypt-nodejs');

var Person = function(firstName, lastName, email, role, password) {
  this.FirstName = firstName;
  this.LastName = lastName;
  this.Email = email;
  this.Role = role;
  this.Password = generateHash(password);

  function generateHash(pass) {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
  }
};

Person.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

module.exports = Person;