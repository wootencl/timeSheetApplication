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
        this.delegateEvents();
    },
    login: function() {
        app.router.navigate('timeSheet', true);
      // // app.router.navigate('timeSheet', true);
      // //  event.preventDefault();
      //   var url = $("#loginRequest").attr('action');
      //   console.log(url);
      //   var formValues = {
      //       email: $('#email').val(),
      //       password: $('#password').val()
      //   };

      //   $.ajax({
      //       url:url,
      //       type:'POST',
      //       dataType:"json",
      //       data: formValues,
      //       success:function (data) {
      //           console.log(["Login request details: ", data]);
      //           if(data.error) {
      //               console.log("Fuck... I died");
      //           }
      //           else { // If not, send them back to the home page
      //               Backbone.history.navigate("/#");
      //           }
      //       }
      //   });
    }
});