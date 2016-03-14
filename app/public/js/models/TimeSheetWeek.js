app.models.TimeSheets = Backbone.Model.extend({
  defaults: {
    weekStartDate: '0000-00-00',
    weekEndDate: '0000-00-00',
    mondayTime: 0,
    tuesdayTime: 0,
    wednesdayTime: 0,
    thursdayTime: 0,
    fridayTime: 0,
    totalTime:0
  }
});