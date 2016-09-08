export const PersonLogin = Backbone.Model.extend({
  urlRoot: '/login',
  defaults: {
    Email: '',
    Password: ''
  },
  validation: {
    Email: [{
      required: true
    }, {
      pattern: 'email',
      msg: 'Invalid Email'
    }],
    Password: {
      required: true
    }
  }
});