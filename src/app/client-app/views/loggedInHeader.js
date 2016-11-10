'use strict';

import { app } from '../app';

export const loggedInHeader = Backbone.View.extend({
    initialize: function(data) {
        this.options = data;
    },
    render: function(){
        this.template = _.template(app.createTemplate('templates/loggedInHeader.tpl', this.options.data));
        this.$el.html(this.template({}));
        this.delegateEvents();
    },
    events: {
        'click #logoutButton' : 'logout'
    },
    logout: function() {
        this.model.fetch({
            success: function(model, response) {
                app.event_bus.trigger('login');
            }
        });
    }
});