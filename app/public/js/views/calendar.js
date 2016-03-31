app.views.Calendar = Backbone.View.extend({
  initialize: function(data) {
      this.options = data;
  },
  render: function() {
      var lotsOfEvents = [
        { start: '2015-10-12', end: '2015-10-16', title: 'Monday to Friday' },
        { start: '2015-10-19', end: '2015-10-23', title: 'Monday to Friday' }
      ];

      this.$el.clndr({
          render: function(data) {
              this.template = _.template(app.createTemplate('templates/clndr.tpl', data));
              return this.template;
          },
          events: lotsOfEvents,
          multiDayEvents: {
              startDate: 'start',
              endDate: 'end'
          }
      });
      this.delegateEvents();
  }
});