'use strict';

app.views.TimeSelectorDay = Backbone.View.extend({
    initialize: function(data) {
      this.options = data;
      this.options.data.formattedDate = moment(this.options.data.date).format('YYYY-MM-DD');
      this.events = this.events || {};
      var inputEventKey = 'change' + ' .input-' + this.options.data.formattedDate;
      this.events[inputEventKey] = 'inputCheck';
      this.totalHours = 0;
    },
    render: function(){
      this.template = _.template(app.createTemplate('templates/timeSelectorDay.tpl', this.options.data));
      $(this.options.el).append(this.template({}));
      this.delegateEvents();
      this.checkTotalTime();
      return this;
    },
    inputCheck: function() {
      var totalTimeDiv = document.getElementById('totalHours-'+this.options.data.formattedDate);
      var totalTime = 0;
      //compute total hours
      var morningLoginHour = $('#timeselectors-'+this.options.data.formattedDate+' #morning-login').val();
      var morningLogoutHourElement = $('#timeselectors-'+this.options.data.formattedDate+' #morning-logout');
      if (morningLoginHour) {
        morningLogoutHourElement.timepicker('option', {'minTime' : morningLoginHour} );
      }
      var morningLogoutHour = morningLogoutHourElement.val();
      var morningHours = moment(morningLogoutHour, 'LT').diff(moment(morningLoginHour, 'LT'), 'h', true);
      if (morningHours>=0) {
        totalTime += morningHours;
      }
      var afternoonLoginHour = $('#timeselectors-'+this.options.data.formattedDate+' #afternoon-login').val();
      var afternoonLogoutHourElement = $('#timeselectors-'+this.options.data.formattedDate+' #afternoon-logout');
      if (afternoonLoginHour) {
        afternoonLogoutHourElement.timepicker('option', {'minTime' : afternoonLoginHour} );
      }
      var afternoonLogoutHour = afternoonLogoutHourElement.val();
      var afternoonHours = moment(afternoonLogoutHour, 'LT').diff(moment(afternoonLoginHour, 'LT'), 'h', true);
      if (afternoonHours>=0) {
        totalTime += afternoonHours;
      }
      totalTimeDiv.innerHTML = totalTime;
      this.checkTotalTime();
      app.event_bus.trigger('totalTime');
      app.event_bus.trigger('inputChange');
    },
    checkTotalTime: function(){
      var totalTimeDiv = document.getElementById('totalHours-'+this.options.data.formattedDate);
      var totalTime = parseFloat(totalTimeDiv.innerHTML);
      if (totalTime>0) {
        totalTimeDiv.style.backgroundColor = '#69a776';
      } else {
        totalTimeDiv.style.backgroundColor = '#dd3c3c';
      }
      this.totalHours = totalTime;
    }
});