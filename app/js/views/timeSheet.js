'use strict';

app.views.timeSheet = Backbone.View.extend({
    template: null,
    initialize: function(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        // this.subTemplate = this.options.subTemplate;
        this.subView = new subView({
                    el: $('#clndr')
        });
        this.render();
    },
    render: function(){
        this.$el.html(this.template({}));
        this.subView.render();
        this.delegateEvents();
    }
});

var subView = Backbone.View.extend({
    render: function() {
        $('#clndr').clndr({
            render: function(data) {
                return _.template(app.createTemplate('templates/clndr.tpl', data));
            }
        });
        this.delegateEvents();
    }
});