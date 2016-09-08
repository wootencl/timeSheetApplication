'use strict';
import { TokenCreation } from '../models/index';
import { Persons } from '../collections/index';
import { personCollectionView } from './index';
import { verifiedUser } from './index';
import { unverifiedUser } from './index';

export const admin = Backbone.View.extend({
  initialize: function(data) {
    this.options = data;

    this.tokenCreationModel = new okenCreation();

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

    this.unverifiedPersons = new Persons();
    this.verifiedPersons = new Persons();

    //Render Parent
    that.$el.html(that.template({}));

    this.verifiedPersons.fetch({
      data: { verified: true },
      success: function (collection, response, options) {
        that.verifiedCollectionView = new personCollectionView({
          collection: that.verifiedPersons,
          childView: verifiedUser,
          el: $('#verifiedUsers-view')
        });

        that.verifiedCollectionView.render();
      }
    });

    this.unverifiedPersons.fetch({
      data: { verified: false },
      success: function (collection, response, options) {
        that.unverifiedCollectionView = new personCollectionView({
          collection: that.unverifiedPersons,
          childView: unverifiedUser,
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
    var toggleElement = $(element.currentTarget).next('.personInfo');
    if ($(toggleElement).height() !== 0) {
      $(toggleElement).height("0px");
    } else {
      this.fetchUserInfo(toggleElement);
    }
  },
  fetchUserInfo: function(toggleElement) {
    var totalHeight = 0;
    $(toggleElement).children().each(function() {
      totalHeight += $(this).outerHeight(true);
    });
    $(toggleElement).height(totalHeight+"px");
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