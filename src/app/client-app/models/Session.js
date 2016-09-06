import { app } from '../app';

app.models.Session = Backbone.Model.extend({
  urlRoot: '/session'
});