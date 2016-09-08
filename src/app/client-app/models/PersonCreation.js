export const PersonCreation = Backbone.Model.extend({
  urlRoot: '/loginCreation',
  defaults: {
    AuthToken: '',
    FirstName: '',
    LastName: '',
    Email: '',
    ConfirmEmail: '',
    Password: '',
    ConfirmPassword: ''
  },
  validation: {
    AuthToken: [{
      required: true
    }, {
      length: 32,
      pattern: /^[0-9a-fA-F]+$/,
      msg: 'Invalid Authentication Token format'
    }],
    FirstName: [{
      required: true
    }, {
      pattern: /^[a-zA-Z]+$/,
      msg: 'Invalid First Name'
    }],
    LastName: [{
      required: true
    }, {
      pattern: /^[a-zA-Z]+$/,
      msg: 'Invalid Last Name'
    }],
    Email: [{
      required: true
    }, {
      pattern: 'email',
      msg: 'Invalid Email'
    }],
    ConfirmEmail: [{
      required: true
    }, {
      equalTo: 'Email',
      msg: 'Does not match Email'
    }],
    Password: [{
      required: true
    }, {
      //One digit and one character minimum
      pattern: /^(?=.*[\d])(?=.*[A-Za-z])[\w\d!?@#$%_]{7,15}$/,
      msg: 'Invalid Password. Must include a digit'
    }],
    ConfirmPassword: [{
      required: true
    }, {
      equalTo: 'Password',
      msg: 'Does not match Password'
    }]
  }
});