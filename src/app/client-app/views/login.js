'use strict';
import { app } from '../app';

app.views.login = Backbone.View.extend({
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
      'click #loginButton' : 'login',
      'click #homeButton' : 'home'
    },
    render: function(){
        this.$el.html(this.template({}));
        this.delegateEvents();
    },
    login: function() {
        event.preventDefault();
        var data = $('#loginRequest').serializeObject();
        this.model.set(data);
        if (this.model.isValid(true)) {
            this.model.save({
                Email: data.Email,
                Password: data.Password
            }, {
                success: function(model, response) {
                    app.event_bus.trigger('timeSheet');
                },
                error: function(model, response) {
                    $('#serverError').html(response.responseJSON.message).removeClass('hidden');
                }
            });
        }
    },
    home: function() {
        app.event_bus.trigger('home');
    }
});