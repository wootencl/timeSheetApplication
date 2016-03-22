'use strict';

app.views.admin = Backbone.View.extend({
  initialize: function(data) {
    this.options = data;
  },
  render: function(){
    // this.collection.fetch({
    //   success: function(collection, response, options) {
    //     console.log(collection);
    //   },
    //   error: function(collection, response, options) {
    //     console.log("There was an error");
    //   }
    // });
    this.template = _.template(app.createTemplate('templates/AdminPanel.tpl'));
    this.$el.html(this.template({}));
    this.delegateEvents();
  }
});