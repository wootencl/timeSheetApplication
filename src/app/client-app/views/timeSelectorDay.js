'use strict';

import { app } from '../app';

export const timeSelectorDay = Backbone.View.extend({
    constructor: function(options) {
        this.options = _.extend({}, options); // make a copy and use it.
        this.options.formattedDate = moment(this.options.date).format('YYYY-MM-DD');
        //this.events = _.clone(this.events) || {};
        this.template = _.template(app.createTemplate('templates/timeSelectorDay.tpl', this.options));

        Backbone.View.prototype.constructor.apply(this, arguments);
    },
    initialize: function() {
      this.totalHours = 0;
    },
    render: function(){
      this.$el.append(this.template({}));
      this.delegateEvents(_.extend(_.clone(this.events), {'change .input-2016-10-31': 'test'}));
      this.checkTotalTime();
      return this;
    },
    test: function() {
      console.log('EVENTS: ', this.events);
    },
    inputCheck: function() {
      var totalTimeDiv = document.getElementById('totalHours-'+this.options.formattedDate);
      var totalTime = 0;
      //compute total hours
      var morningLoginHour = $('#timeselectors-'+this.options.formattedDate+' #morning-login').val();
      var morningLogoutHourElement = $('#timeselectors-'+this.options.formattedDate+' #morning-logout');
      if (morningLoginHour) {
        morningLogoutHourElement.timepicker('option', {'minTime' : morningLoginHour} );
      }
      var morningLogoutHour = morningLogoutHourElement.val();
      var morningHours = moment(morningLogoutHour, 'LT').diff(moment(morningLoginHour, 'LT'), 'h', true);
      if (morningHours>=0) {
        totalTime += morningHours;
      }
      var afternoonLoginHour = $('#timeselectors-'+this.options.formattedDate+' #afternoon-login').val();
      var afternoonLogoutHourElement = $('#timeselectors-'+this.options.formattedDate+' #afternoon-logout');
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
      var totalTimeDiv = this.$('#totalHours-' + this.options.formattedDate),
      totalTime = parseFloat(totalTimeDiv.html());

      totalTimeDiv.css('background-color', totalTime > 0 ? '#69a776' : '#dd3c3c');
      this.totalHours = totalTime;
    }
});