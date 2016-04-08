'use strict';

app.views.admin = Backbone.View.extend({
  initialize: function(data) {
    this.options = data;

    this.tokenCreationModel = new app.models.TokenCreation();

    this.template = _.template(this.options.template);

    Backbone.Validation.bind(this, {
      model: this.tokenCreationModel,
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
  render: function(){
    var that = this;

    this.unverifiedPersons = new app.collections.Persons();
    this.verifiedPersons = new app.collections.Persons();

    //Render Parent
    that.$el.html(that.template({}));

    this.verifiedPersons.fetch({
      data: { verified: true },
      success: function (collection, response, options) {
        that.verifiedCollectionView = new app.views.personCollectionView({
          collection: that.verifiedPersons,
          childView: app.views.verifiedUser,
          el: $('#verifiedUsers-view')
        });

        that.verifiedCollectionView.render();
      }
    });

    this.unverifiedPersons.fetch({
      data: { verified: false },
      success: function (collection, response, options) {
        that.unverifiedCollectionView = new app.views.personCollectionView({
          collection: that.unverifiedPersons,
          childView: app.views.unverifiedUser,
          el: $('#unverifiedUsers-view')
        });

        that.unverifiedCollectionView.render();
      }
    });

    this.delegateEvents();
  },
  events: {
    'click .verified.user' : 'expandUserInfo',
    'click .unverified.user' : 'expandUserInfo',
    'click #submitCreateUserButton' : 'createToken'
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
  },
  createToken: function() {
    var that = this;
    event.preventDefault();
    var data = $('#createUserRequest').serializeObject();
    this.tokenCreationModel.set(data);
    if (this.tokenCreationModel.isValid(true)) {
        this.tokenCreationModel.save({
            Email: data.Email
        }, {
            success: function(model, response) {
              $('#signupEmailModal').foundation('reveal', 'open');
              $('#serverError').html('').addClass('hidden');
              $('#createUserRequest')[0].reset();
              that.unverifiedCollectionView.collection.fetch({
                data: { verified: false }
              });
            },
            error: function(model, response) {
                $('#serverError').html(response.responseJSON.message).removeClass('hidden');
            }
        });
    }
  }
});