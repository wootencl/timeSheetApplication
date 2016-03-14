'use strict';

app.views.timeSelector = Backbone.View.extend({
    initialize: function(data) {
        this.options = data;
    },
    render: function(){
        this.template = _.template(app.createTemplate('templates/timeSelector.tpl', this.options.data));
        this.$el.html(this.template({}));
        this.delegateEvents();
    }
});