//Not particularly pleased with the nongeneric way I'm implementing this at the moment.
//Possible alternative is to use actual dates instead of mondayTime, tuesdayTime, etc.
// Ex: 2016-05-07-Time

'use strict';
import { timeSelectorDay } from './index';
import { app } from '../app';

export const timeSelector = Backbone.View.extend({
    initialize: function(data) {
      this.options = data;
      this.dayIds = ['mondayTime', 'tuesdayTime', 'wednesdayTime', 'thursdayTime', 'fridayTime'];
      this.listenTo(app.event_bus, 'totalTime', this.computeTotalTime);
      this.timeSelectorDayViews = {};
    },
    render: function(){
      this.template = _.template(app.createTemplate('templates/timeSelector.tpl', { weekStartDate: this.model.get('weekStartDate'), totalTime: this.model.get('totalTime') }));
      $(this.options.el).html(this.template({}));

      for (var i=0; i<this.dayIds.length; i++) {
        this.timeSelectorDayViews[i] = new timeSelectorDay({
          el: '#timePickersWrapper',
          data: {
            time: this.model.get(this.dayIds[i]),
            date: moment(this.model.get('weekStartDate')).add(i, 'd')
          }
        }).render();
      }
      $('input').timepicker({
        noneOption: true,
        step: 15,
        disableTouchKeyboard: true,
        disableTextInput: true
      });
      if (this.checkTotalTime()>0) {
        this.handlePreviouslySubmitted();
      }
      this.delegateEvents();
    },
    checkTotalTime: function() {
      var totalTimeDiv = document.getElementById('totalTime');
      var totalTime = parseFloat(totalTimeDiv.innerHTML);
      if (totalTime>0) {
        totalTimeDiv.style.backgroundColor = '#69a776';
      } else {
        totalTimeDiv.style.backgroundColor = '#dd3c3c';
      }
      return totalTime;
    },
    computeTotalTime: function() {
      var totalTime = 0;
      for (var i=0; i<this.dayIds.length; i++) {
        totalTime += this.timeSelectorDayViews[i].totalHours;
      }
      document.getElementById('totalTime').innerHTML = totalTime;
      this.checkTotalTime();
    },
    handlePreviouslySubmitted: function() {
      var coverDiv = document.getElementById('timePickersCover');
      var coverInnerDiv = document.createElement('div');
      var coverInnerDivSpan = document.createElement('div');
      var resubmissionButton = document.createElement('button');
      coverDiv.className = 'active';
      resubmissionButton.innerHTML = 'Request Review';
      resubmissionButton.className = 'expand';
      coverInnerDivSpan.innerHTML = alreadySubmittedInfo;
      coverInnerDiv.appendChild(coverInnerDivSpan);
      coverInnerDiv.appendChild(resubmissionButton);
      coverDiv.appendChild(coverInnerDiv);
    },
    onClose: function() {
      for (var key in this.timeSelectorDayViews) {
         if (this.timeSelectorDayViews.hasOwnProperty(key)) {
            this.timeSelectorDayViews[key].close();
         }
      }
    }
});

var alreadySubmittedInfo = 'This timesheet has already been submitted. If you would like \
to resubmit please request a review.';
