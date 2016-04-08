//NOTES:
// - Reading it sounds like innerHTML opens the possibility for XSS attacks
// though only when you are using user input. Just something to keep in mind.


app.views.Calendar = Backbone.View.extend({
  initialize: function(data) {
      this.options = data;
  },
  render: function() {
    var that = this;
    this.$el.clndr({
        render: function(data) {
            this.template = _.template(app.createTemplate('templates/clndr.tpl', data));
            return this.template;
        },
        clickEvents: {
          onMonthChange: function(month) {
            console.log(month);
          }
        }
    });
    //render weeks divs on top of calendar
    var monthMonday = moment(this.options.renderWeekStartDate).startOf('month').startOf('isoWeek').format('YYYY-MM-DD');
    var daysContainer = weekStartDayDiv = document.getElementById('daysContainer');
    while(moment(monthMonday).isSameOrBefore(this.options.renderWeekStartDate)) {
      var weekDiv = document.createElement('div');
      var weekDivSpan = document.createElement('span');
      var weekStartDayDiv = document.getElementById(monthMonday);
      weekDiv.id = monthMonday+'-weekDiv';
      weekDiv.className = 'weekDiv';
      weekDiv.className += ' completed';
      weekDiv.dataset.date = monthMonday;
      weekDivSpan.innerHTML = 'Completed';
      weekDiv.appendChild(weekDivSpan);
      daysContainer.appendChild(weekDiv);
      weekDiv.style.top = weekStartDayDiv.offsetTop+'px';
      weekDiv.style.left = weekStartDayDiv.offsetLeft+'px';
      monthMonday = moment(monthMonday).add(1, 'w').format('YYYY-MM-DD');
    }

    this.shiftWeekSelector(this.options.renderWeekStartDate);
    this.delegateEvents();
  },
  events: {
    'click .weekDiv' : 'weekSelected'
  },
  weekSelected: function(element) {
    var weekDiv = document.getElementById(element.currentTarget.id);
    $('.selected').removeClass('selected');
    this.shiftWeekSelector(weekDiv.dataset.date);
    weekDiv.className += ' selected';
  },
  shiftWeekSelector: function(date) {
    var weekStartDayDiv = document.getElementById(date);
    var weekSelector = document.getElementById('weekSelector');
    var weekDiv = document.getElementById(date+'-weekDiv');
    weekDiv.className += ' selected';
    weekSelector.style.top = weekStartDayDiv.offsetTop+'px';
    weekSelector.style.left = weekStartDayDiv.offsetLeft+'px';
  }
});