'use strict';

app.views.verifiedUser = Backbone.View.extend({
    initialize: function(data) {
        this.options = data;
    },
    render: function(){
        console.log("hello");
        this.template = _.template(app.createTemplate('templates/verifiedUser.tpl', { person: this.model }));
        this.$el.html(this.template({}));
        this.delegateEvents();
    }
});