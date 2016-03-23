'use strict';

//NOTE: Once I have a better idea of how I'm going to serve the personal info/timesheet info
// going to try and do some better arith. about the height assignment (and hopefully refactor)
// user click into one function

app.views.admin = Backbone.View.extend({
  initialize: function(data) {
    this.options = data;
  },
  render: function(){
    var self = this;
    this.collection.fetch({
      success: function(collection, response, options) {
        self.collection = collection;

        self.template = _.template(app.createTemplate('templates/AdminPanel.tpl', {persons: response}));
        self.$el.html(self.template({}));
        self.delegateEvents();
      },
      error: function(collection, response, options) {
        console.log("There was an error");
      }
    });
  },
  events: {
    'click .verified.user' : 'expandForValidUserInfo',
    'click .unverified.user' : 'expandForInvalidUserInfo'
  },
  expandForValidUserInfo: function(element) {
    var personalInformationHeight = 7.4;
    var timeSheetInformationHeight = 1.5;
    var totalHeight = personalInformationHeight + timeSheetInformationHeight;

    var toggleElement = $(element.currentTarget).next('.personInfo');
    if ($(toggleElement).height() !== 0) {
      $(toggleElement).height("0em");
    } else {
      $(toggleElement).height(totalHeight+"em");
    }
  },
  expandForInvalidUserInfo: function(element) {
    var toggleElement = $(element.currentTarget).next('.personInfo');
    if ($(toggleElement).height() !== 0) {
      $(toggleElement).height("0em");
    } else {
      $(toggleElement).height("2.5em");
    }
  }
});