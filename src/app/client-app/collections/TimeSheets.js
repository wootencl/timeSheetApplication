import { app } from '../app';

app.collections.TimeSheets = Backbone.Collection.extend({
  url: '/timeSheets',
  model: app.models.TimeSheet,
  parse: function(response) {
    return response.results;
  }
});