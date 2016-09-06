'use strict';
import { app } from '../app';

app.views.timeSheet = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        var initializedWeekStartDate = moment().startOf('isoWeek').format('YYYY-MM-DD');

        this.options = data;
        this.template = _.template(this.options.template);
        this.timeSheets = new app.collections.TimeSheets();
        this.calendarView = new app.views.Calendar({
            el: '#clndr-view',
            renderWeekStartDate: initializedWeekStartDate,
            collection: this.timeSheets
        });

        this.listenTo(this.calendarView, 'timeSelector', this.renderTimeSelector);
    },
    render: function() {
        var initializedWeekStartDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
        //Render Parent
        this.$el.html(this.template({}));

        //Render Calendar
        this.calendarView.render();
        this.delegateEvents();
    },
    renderTimeSelector: function(date) {
        var model = this.timeSheets.find(function(timeSheet) {
            var modelStartDate = moment.utc(timeSheet.get('weekStartDate')).format('YYYY-MM-DD');
            return moment(modelStartDate).isSame(date);
        });
        if (this.timeSelectorView) {
            this.timeSelectorView.close();
        }
        this.timeSelectorView = new app.views.TimeSelector({
            el: '#timeSelector-view',
            model: model
        });
        this.timeSelectorView.render();
    }
});

