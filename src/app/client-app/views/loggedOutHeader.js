'use strict';
export const loggedOutHeader = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        this.options = data;
        this.template = _.template(this.options.template);
    },
    render: function(){
        this.$el.html(this.template({}));
        this.delegateEvents();
    }
});