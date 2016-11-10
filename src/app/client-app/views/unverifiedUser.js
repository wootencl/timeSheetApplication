'use strict';

import { ResendSignupEmail } from '../models/index';
import { app } from '../app';

export const unverifiedUser = Backbone.View.extend({
    initialize: function(data) {
        this.options = data;
        this.resendSignupEmailModel = new ResendSignupEmail();
    },
    render: function(){
        this.template = _.template(app.createTemplate('templates/unverifiedUser.tpl', { person: this.model.attributes }));
        this.$el.html(this.template({}));
        this.delegateEvents();
        return this;
    },
    events: {
      'click .deleteButton' : 'delete',
      'click .resendButton' : 'resendSignupEmail'
    },
    delete: function() {
      var that = this;
      $('#deleteModal').foundation('reveal', 'open');
      $(document).on('opened.fndtn.reveal', '#deleteModal[data-reveal]', function () {
          $('#deleteYes').click(function () {
              that.model.destroy();
              $('#deleteModal[data-reveal]').foundation('reveal', 'close');
              modalListenerCleanup();
          })
          $('#deleteNo').click(function (event) {
              $('#deleteModal[data-reveal]').foundation('reveal', 'close');
              modalListenerCleanup();
          })
      });

      function modalListenerCleanup() {
        $(document).off('opened.fndtn.reveal');
        $('#deleteYes').off('click');
        $('#deleteNo').off('click');
      }
    },
    resendSignupEmail: function() {
      var that = this;
      this.resendSignupEmailModel.save({
          Email: this.model.get('Email'),
          Token: this.model.get('id')
      }, {
          success: function(model, response) {
            $('#resendSignupEmailModal').foundation('reveal', 'open');
          },
          error: function(model, response) {
              //Some sort of error handling here
          }
      });
      console.log();
    }
});