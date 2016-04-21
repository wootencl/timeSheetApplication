//NOTES:
// - Reading it sounds like innerHTML opens the possibility for XSS attacks
// though only when you are using user input. Just something to keep in mind.
// - Next/Prev month rerenders the 'days' subview of the calendar. With that,
// I'm recreating the necessary DOM elements each time.

app.views.Calendar = Backbone.View.extend({
  initialize: function(data) {
    this.options = data;
  },
  render: function() {
    this.setElement($(this.options.el));
    var that = this;
    $(this.options.el).clndr({
        render: function(data) {
            this.template = _.template(app.createTemplate('templates/clndr.tpl', data));
            return this.template;
        },
        clickEvents: {
          onMonthChange: function(month) {
            that.fetchCollection(month, function(err) {
              if (err) return console.log(err);
              var weekSelectorDate = moment(that.collection.at(0).get('weekStartDate')).format('YYYY-MM-DD');
              that.renderNextPrevButtons();
              that.renderDays(weekSelectorDate);
            });
          }
        }
    });

    this.fetchCollection(this.options.renderWeekStartDate, function(err) {
      that.renderDays(that.options.renderWeekStartDate);
      that.renderNextPrevButtons();
      that.delegateEvents();
    });
  },
  events: {
    'click .weekDiv' : 'weekSelected'
  },
  renderDays: function(weekSelectorDate) {
    //render week divs on top of calendar
    var daysContainer = document.getElementById('daysContainer');
    var startWeekDate = moment(this.collection.at(0).get('weekStartDate'));
    var endWeekDate = moment(this.collection.at(this.collection.length-1).get('weekStartDate'));
    for (startWeekDate ; moment(startWeekDate).isSameOrBefore(endWeekDate) ; startWeekDate = moment(startWeekDate).add(1, 'w')) {
      var weekDiv = document.createElement('div');
      var weekDivSpan = document.createElement('span');
      var formattedDate = moment(startWeekDate).format('YYYY-MM-DD');
      var weekStartDayDiv = document.getElementById(formattedDate);
      weekDiv.id = formattedDate+'-weekDiv';
      weekDiv.className = 'weekDiv';

      //complete || incomplete || empty
      var model = this.collection.find(function(timeSheet) {
        var modelStartDate = moment(timeSheet.get('weekStartDate'));
        return moment(modelStartDate).isSame(startWeekDate);
      });
      if (model) {
        if(model.get('totalTime') === null) {
          weekDiv.className += ' incomplete';
          weekDiv.dataset.date = formattedDate;
          weekDivSpan.innerHTML = 'Incomplete';
        } else {
          weekDiv.className += ' complete';
          weekDiv.dataset.date = formattedDate;
          weekDivSpan.innerHTML = 'Complete';
        }
      }
      weekDiv.appendChild(weekDivSpan);
      daysContainer.appendChild(weekDiv);

      //Shift to location

      weekDiv.style.top = weekStartDayDiv.offsetTop+'px';
      weekDiv.style.left = weekStartDayDiv.offsetLeft+'px';
    }
    this.shiftWeekSelector(weekSelectorDate);
  },
  weekSelected: function(element) {
    var weekDiv = document.getElementById(element.currentTarget.id);
    $('.selected').removeClass('selected');
    this.shiftWeekSelector(weekDiv.dataset.date);
    weekDiv.className += ' selected';
  },
  shiftWeekSelector: function(date) {
    this.trigger('timeSelector', date);
    var weekStartDayDiv = document.getElementById(date);
    var weekSelector = document.getElementById('weekSelector');
    var weekDiv = document.getElementById(date+'-weekDiv');
    weekDiv.className += ' selected';
    weekSelector.style.top = weekStartDayDiv.offsetTop+'px';
    weekSelector.style.left = weekStartDayDiv.offsetLeft+'px';
  },
  renderNextPrevButtons: function() {
    if(this.options.next) {
      $('.clndr-next-button').removeClass('inactive');
    } else {
      $('.clndr-next-button').addClass('inactive');
    }
    if(this.options.prev) {
      $('.clndr-previous-button').removeClass('inactive');
    } else {
      $('.clndr-previous-button').addClass('inactive');
    }
  },
  fetchCollection: function(date, done) {
    var that = this;
    var initializedSelectStartDate,
    initializedSelectEndDate;

    //Check for prev/next month mondays viewable
    var prevMonthMonday = document.getElementsByClassName('last-month monday');
    if (prevMonthMonday.length) {
      initializedSelectStartDate = prevMonthMonday[0].id;
    } else {
      initializedSelectStartDate = moment(date).startOf('month').format('YYYY-MM-DD');
    }
    var nextMonthMonday = document.getElementsByClassName('next-month monday');
    if (nextMonthMonday.length) {
      initializedSelectEndDate = nextMonthMonday[0].id;
    } else {
      initializedSelectEndDate = moment(date).endOf('month').format('YYYY-MM-DD');
    }
    this.collection.fetch({
      reset: true,
      data : {
          selectStartDate: initializedSelectStartDate,
          selectEndDate: initializedSelectEndDate
      },
      success: function(collection, response, options) {
          that.options.next = response.next;
          that.options.prev = response.prev;
          done(null);
      },
      error: function(collection, response, options) {
          //handle server error
          done(err);
      }
    });
  }
});