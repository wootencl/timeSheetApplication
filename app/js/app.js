//Author: Carter Wooten
//Javascript tutorials that helped me along the way:
// - Templates: http://www.codebelt.com/javascript/precompiling-javascript-underscore-templates/

'use strict';

var app = app || (function () {


    var api = {
        views: {},
        models: {},
        collections: {},
        templates: {},
        content: null,
        router: null,
        todos: null,
        init: function() {
            this.content = $('#container');
            ViewsFactory.login();
            return this;
        },
        changeContent: function(el) {
            this.content.empty().append(el);
            return this;
        }
    };
    var ViewsFactory = {
        createTemplate: function(templatePath, data) {
            var templateString = window['JST'][templatePath](data);
            return templateString;
        },
        login: function() {
            if(!this.loginView) {
                this.loginView = new api.views.login({
                    el: $('#container'),
                    template: this.createTemplate('templates/login.tpl')
                });
            }
            return this.loginView;
        }
    };

    var Router = Backbone.Router.extend({});
    api.router = new Router();

    return api;
})();

