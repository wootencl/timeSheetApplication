'use strict';

app.views.home = Backbone.View.extend({
    template: null,
    initialize: function(data) {
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
    },
    toLogin : function() {
        app.router.navigate('login', true);
    },
    toLoginCreation : function () {
        app.router.navigate('CreateAccount', true);
    }
});