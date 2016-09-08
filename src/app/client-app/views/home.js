'use strict';

import { app } from '../app';

export const home = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        var resizes = ['homeContent'];
        $(window).resize( _.throttle( function() {
            app.resizeFunction(resizes);
        }, 1000 ) );

        this.options = data;
        this.template = _.template(this.options.template);
        this.render();
    },
    events: {
        'click #toLoginPageButton' : 'toLogin',
        'click #toAccountCreationButton' : 'toLoginCreation'
    },
    render: function(){
        this.$el.html(this.template({}));
        this.delegateEvents();
        //Making it so the 'trigger' call is next in the event
        //queue after the rendering
        setTimeout( function() {
            $(window).trigger('resize');
        }, 0);
    },
    toLogin : function() {
        app.event_bus.trigger('login');
    },
    toLoginCreation : function () {
        app.event_bus.trigger('loginCreation');
    }
});