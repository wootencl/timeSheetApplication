'use strict';

app.views.TimeSelector = Backbone.View.extend({
    initialize: function(data) {
        this.options = data;
    },
    render: function(){
        this.template = _.template(app.createTemplate('templates/timeSelector.tpl'));
        this.$el.html(this.template({}));
        this.delegateEvents();
    }
});