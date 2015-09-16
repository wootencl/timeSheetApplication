'use strict';

app.views.login = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        this.render();
    },
    events: {
      "click #loginButton" : "login"
    },
    render: function(){
        this.$el.html(this.template({}));
    },
    login: function(event) {
      event.preventDefault();
      var url = "../../api/login";
      var formValues = {
        email: $("#email").val(),
        password: $("#password").val()
      };
      $.ajax({
        url: url,
        type: 'POST',
        dataType: "json",
        data: 'formValues',
        success: function(data) {
          console.log("Login request details: ", data);
        }
      })
    }
});