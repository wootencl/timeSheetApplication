import { app } from '../app';

app.models.ResendSignupEmail = Backbone.Model.extend({
  urlRoot: '/resendSignupEmail'
});