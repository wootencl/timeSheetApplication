app.models.Person = Backbone.Model.extend({
    defaults: {
        Name: '',
        Email: '',
        Password: '',
        RememberMe: '',
        LoginFailed: false,
        LoginAccepted: false,
        times: {
          previousMonth: '',
          currentMonth: '',
          nextMonth: ''
        }
    }
});