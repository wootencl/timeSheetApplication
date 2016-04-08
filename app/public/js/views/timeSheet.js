'use strict';

app.views.timeSheet = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        this.render();
    },
    render: function(){
        var that = this,
        initializedWeekStartDate = moment().startOf('isoWeek').format('YYYY-MM-DD'),
        initializedSelectStartDate = moment().startOf('month').subtract(6,'days').format('YYYY-MM-DD'),
        initializedSelectEndDate = moment().endOf('month').add(6,'days').format('YYYY-MM-DD');

        this.timeSheets = new app.collections.TimeSheets();

        //Render Parent
        this.$el.html(this.template({}));

        this.timeSheets.fetch({
            data : {
                selectStartDate: initializedSelectStartDate,
                selectEndDate: initializedSelectEndDate
            },
            success: function(collection, response, options) {
                console.log(response);
            },
            error: function(collection, response, options) {
                //handle server error
            }
        });

        this.calendarView = new app.views.Calendar({
            el: $('#clndr-view'),
            renderWeekStartDate: initializedWeekStartDate
        });

        this.timeSelectorView = new app.views.TimeSelector({
            el: $('#timeSelector-view')
        });

        this.timeSelectorView.render();
        this.calendarView.render();
        this.delegateEvents();
    }
});

