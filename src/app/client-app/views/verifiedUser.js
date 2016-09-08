// NOTES:
// - I seperated this and unverified user as I intend on putting a large amount more
// logic in the 'verified user' view.

'use strict';

import { app } from '../app';

export const verifiedUser = Backbone.View.extend({
    initialize: function(data) {
        this.options = data;
    },
    render: function(){
        this.template = _.template(app.createTemplate('templates/verifiedUser.tpl', { person: this.model.attributes }));
        this.$el.html(this.template({}));
        this.delegateEvents();
        return this;
    },
    events: {
      'click .deleteButton' : 'delete'
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
    }
});