import { app } from '../app';

app.models.TimeSheet = Backbone.Model.extend({
  idAttribute: 'weekStartDate'
});