'use strict';

app.views.admin = Backbone.View.extend({
  initialize: function(data) {
    this.options = data;
  },
  render: function(){
    var that = this;
    this.collection.fetch({
      success: function(collection, response, options) {
        // that.collection = collection;
        // //sorting collection into verfied/unverified
        // var unverifiedPersons = new app.collections.Persons();
        // var verifiedPersons = new app.collections.Persons();
        // that.collection.each( function(person) {
        //   if (person.attributes.FirstName === null) {
        //     unverifiedPersons.add(person);
        //   } else {
        //     verifiedPersons.add(person);
        //   }
        // });

        // var verifiedCollectionView = new app.views.personCollectionView({
        //   collection: verifiedPersons,
        //   childView: app.views.verifiedUser,
        //   el: $("#verifiedUsers-view")
        // });

        // verifiedCollectionView.render();

        that.template = _.template(app.createTemplate('templates/AdminPanel.tpl', {persons: response}));
        that.$el.html(that.template({}));
        that.delegateEvents();
      },
      error: function(collection, response, options) {
        console.log("There was an error");
      }
    });
  },
  events: {
    'click .verified.user' : 'expandUserInfo',
    'click .unverified.user' : 'expandUserInfo'
  },
  expandUserInfo: function(element) {
    var totalHeight = 0;
    $(element.currentTarget).next('.personInfo').children().each(function() {
      totalHeight += $(this).outerHeight(true);
    });
    var toggleElement = $(element.currentTarget).next('.personInfo');
    if ($(toggleElement).height() !== 0) {
      $(toggleElement).height("0px");
    } else {
      $(toggleElement).height(totalHeight+"px");
    }
  }
});