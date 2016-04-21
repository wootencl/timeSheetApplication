'use strict';

app.views.TimeSelectorDay = Backbone.View.extend({
    initialize: function(data) {
      this.options = data;
    },
    render: function(){
      this.template = _.template(app.createTemplate('templates/timeSelectorDay.tpl', this.options.data));
      $(this.options.el).append(this.template({}));
      this.delegateEvents();
    }
});