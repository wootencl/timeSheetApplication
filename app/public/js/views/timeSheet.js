'use strict';

app.views.timeSheet = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        this.render();
    },
    render: function(){
        //Render Parent
        this.$el.html(this.template({}));

        this.timeSelectorView = new app.views.TimeSelector({
            el: $('#timeSelector-view')
        });
        this.calendarView = new app.views.Calendar({
            el: $('#clndr-view')
        });

        this.timeSelectorView.render();
        this.calendarView.render();
        this.delegateEvents();
    }
});

