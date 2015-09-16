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

            //Load the Login screen
            //Initialize Foundation
            $(document).foundation();
            Backbone.history.start();
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
        },
        home: function() {
            if (!this.homeView) {
                this.homeView = new api.views.home({
                    el: $('#container'),
                    template: this.createTemplate('templates/home.tpl')
                });
            }
            return this.homeView;
        }
    };

    var Router = Backbone.Router.extend({
        routes: {
            'login' : 'login',
            '' : 'home'
        },
        login : function() {
            var view = ViewsFactory.login();
            view.render();
        },
        home : function() {
            var view = ViewsFactory.home();
            view.render();
        }
    });
    api.router = new Router();

    return api;
})();

