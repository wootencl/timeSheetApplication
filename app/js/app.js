//Author: Carter Wooten
//Javascript tutorials that helped me along the way:
// - Templates: http://www.codebelt.com/javascript/precompiling-javascript-underscore-templates/
// - Garbage Collection: https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/

'use strict';

// Alterations made to BackBone itself within a self executing anonymous function
(function(){
    // Overwriting the built in view.remove() function.
    // Reasoning: I decided to do it this way because of the issues arising from
    // the acutal destruction of my "#container" div
    Backbone.View.prototype.remove = function() {
            this.$el.empty().off();
            this.stopListening();
            return this;
    };
    // writing a custom close function for backbone views for the purpose of garbage collection
    Backbone.View.prototype.close = function() {
        this.remove();
        this.unbind();
        //prototype necessary to disconnect any model and collection events attached to a view.
        if (this.onClose){
            this.onClose();
        }
    };
})();

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
        },
        //Global 'createTemplate' function
        createTemplate: function(templatePath, data) {
            var templateString = window['JST'][templatePath](data);
            return templateString;
        }
    };

    var ViewsFactory = {
        createTemplate: function(templatePath, data) {
            var templateString = window['JST'][templatePath](data);
            return templateString;
        },
        showView: function(view) {
            if (this.currentView) {
                this.currentView.close();
            }

            this.currentView = view;
            this.currentView.render();
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
        },
        loginCreation: function() {
            if (!this.loginCreationView) {
                this.loginCreationView = new api.views.loginCreation({
                    el: $('#container'),
                    template: this.createTemplate('templates/loginCreation.tpl')
                });
            }
            return this.loginCreationView;
        },
        timeSheet: function() {
            if (!this.timeSheetView) {
                this.timeSheetView = new api.views.timeSheet({
                    el: $('#container'),
                    template: this.createTemplate('templates/timeSheet.tpl')
                });
            }
            return this.timeSheetView;
        }
    };

    var Router = Backbone.Router.extend({
        routes: {
            'timeSheet' : 'timeSheet',
            'CreateAccount' : 'loginCreation',
            'login' : 'login',
            '' : 'home'
        },
        loginCreation : function () {
            var view = ViewsFactory.loginCreation();
            ViewsFactory.showView(view);
        },
        login : function() {
            var view = ViewsFactory.login();
            ViewsFactory.showView(view);
        },
        home : function() {
            var view = ViewsFactory.home();
            ViewsFactory.showView(view);
        },
        timeSheet : function() {
            var view = ViewsFactory.timeSheet();
            ViewsFactory.showView(view);
        }
    });
    api.router = new Router();

    return api;
})();

