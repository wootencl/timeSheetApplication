import { TimeSheet } from '../models/index';

export const TimeSheets = Backbone.Collection.extend({
  url: '/timeSheets',
  model: TimeSheet,
  parse: function(response) {
    return response.results;
  }
});