//Not particularly pleased with the nongeneric way I'm implementing this at the moment.
//Possible alternative is to use actual dates instead of mondayTime, tuesdayTime, etc.
// Ex: 2016-05-07-Time

'use strict';

app.views.TimeSelector = Backbone.View.extend({
    initialize: function(data) {
      this.options = data;
      this.dayIds = ['mondayTime', 'tuesdayTime', 'wednesdayTime', 'thursdayTime', 'fridayTime'];
    },
    render: function(){
      this.template = _.template(app.createTemplate('templates/timeSelector.tpl', { weekStartDate: this.model.get('weekStartDate') }));
      $(this.options.el).html(this.template({}));

      for (var i=0; i<this.dayIds.length; i++) {
        var temp = new app.views.TimeSelectorDay({
          el: '#timePickersWrapper',
          data: {
            time: this.model.get(this.dayIds[i]),
            date: moment(this.model.get('weekStartDate')).add(i, 'd')
          }
        });
        temp.render();
      }
      this.delegateEvents();
    }
});