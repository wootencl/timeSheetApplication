import { app } from '../app';

app.collections.Persons = Backbone.Collection.extend({
  url: '/persons',
  model: app.models.Person
});