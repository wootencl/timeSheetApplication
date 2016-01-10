'use strict';

app.views.timeSheet = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        // this.subTemplate = this.options.subTemplate;
        this.subViewCalendar = new subViewCalendar();
        this.subViewTimeSelector = new subViewTimeSelector();
        this.render();
    },
    render: function(){
        this.$el.html(this.template({}));
        this.subViewTimeSelector.render();
        this.subViewCalendar.render();
        this.delegateEvents();
    }
});

var subViewCalendar = Backbone.View.extend({
    render: function() {
        var lotsOfEvents = [
          { start: '2015-10-12', end: '2015-10-16', title: 'Monday to Friday' },
          { start: '2015-10-19', end: '2015-10-23', title: 'Monday to Friday' }
        ];

        $('#clndr-view').clndr({
            render: function(data) {
                return _.template(app.createTemplate('templates/clndr.tpl', data));
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

var subViewTimeSelector = Backbone.View.extend({
    render: function() {
        this.template = _.template(app.createTemplate('templates/timeSelector.tpl'));
        $('#timeSelector-view').html(this.template({}));
        this.delegateEvents();
    }
});

