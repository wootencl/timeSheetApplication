app.models.PersonCreation = Backbone.Model.extend({
  urlRoot: '/loginCreation',
  defaults: {
    AuthToken: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Role: 'USER'
  }
});