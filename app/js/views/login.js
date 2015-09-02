'use strict';
app.views.login = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        this.render();
    },
    render: function(){
        this.$el.html(this.template({}));
    }
});