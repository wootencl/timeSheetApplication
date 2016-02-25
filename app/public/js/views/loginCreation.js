'use strict';

app.views.loginCreation = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        this.render();
    },
    events: {
      "click #submitButton" : "loginCreation"
    },
    render: function(){
        this.$el.html(this.template({}));
        this.delegateEvents();
    },
    loginCreation: function(){
        event.preventDefault();

        this.model.set({ AuthToken: $("#authKey").val(), FirstName: $("#firstName").val(), LastName: $("#lastName").val(), Email: $("#email").val(), Password: $("#password").val()});
        this.model.save();
    }
});