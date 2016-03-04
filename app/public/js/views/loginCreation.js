//Validation Source: http://jsfiddle.net/thedersen/udXL5/

'use strict';

app.views.loginCreation = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        this.render();

        Backbone.Validation.bind(this, {
          valid: function(view, attr) {
            var element = view.$("[name="+attr+"]");
            var parent = element.closest('.inputWrapper');
            element.removeClass('error');
            parent.find('small.error').html('').addClass('hidden');
          },
          invalid: function(view, attr, error) {
            //Hide server errors if input error arises
            $('#serverError').html('').addClass('hidden');
            var element = view.$("[name="+attr+"]");
            var parent = element.closest('.inputWrapper');
            element.addClass('error');
            parent.find('small.error').html(error).removeClass('hidden');
          }
        });
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
        var data = $('#loginCreation').serializeObject();
        this.model.set(data);
        if (this.model.isValid(true)) {
            this.model.save({
                FirstName: data.FirstName,
                LastName: data.LastName,
                Email: data.Email,
                Password: data.Password,
                AuthToken: data.AuthToken
            }, {
                success: function(model, response) {
                    app.router.navigate('timeSheet', true);
                },
                error: function(model, response) {
                    $('#serverError').html(response.responseJSON.message).removeClass('hidden');
                }
            });
        }
    }
});