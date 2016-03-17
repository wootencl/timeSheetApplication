'use strict';

app.views.admin = Backbone.View.extend({
    initialize: function(data) {
        this.options = data;
    },
    render: function(){
        this.template = _.template(app.createTemplate('templates/AdminPanel.tpl', this.options.data));
        this.$el.html(this.template({}));
        this.delegateEvents();
    }
});