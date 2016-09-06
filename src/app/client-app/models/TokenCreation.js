import { app } from '../app';

app.models.TokenCreation = Backbone.Model.extend({
  urlRoot: '/tokenCreation',
  validation: {
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
    }]
  }
});