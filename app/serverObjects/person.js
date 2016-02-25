'use strict';

var bcrypt = require('bcrypt');

var Person = function() {
};

Person.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

Person.prototype.generateHash = function(pass) {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
};

module.exports = Person;