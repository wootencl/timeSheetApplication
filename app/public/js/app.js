//Author: Carter Wooten
//Javascript tutorials that helped me along the way:
// - Templates: http://www.codebelt.com/javascript/precompiling-javascript-underscore-templates/
// - Garbage Collection: https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/

// Templating system conflicting.
// TODO: http://stackoverflow.com/questions/18679422/issue-with-with-use-strict-and-underscore-js
//'use strict';

// Alterations made to JS libraries/frameworks within a self executing anonymous function
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
    //A serialize object function that I saw no purpose in trying to rewrite
    //Source: http://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
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
        init: function() {
            this.content = $('#container');

            //Load the Login screen
            //Initialize Foundation
            $(document).foundation();

            window.session = new api.models.Session();

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
        },
        //This is a helper function that will resize a parent div so that
        //a child of the parent can be vertically aligned within
        resizeFunction: function(elementArray) {
            for (var i  = 0; i < elementArray.length; i++) {
                $('#'+elementArray[i]+'>.verticalParentHeight').each( function() {
                        $(".verticalParent", this).css("height", $(this).height());
                });
            }
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
                    template: this.createTemplate('templates/login.tpl'),
                    model: new api.models.PersonLogin()
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
                    template: this.createTemplate('templates/loginCreation.tpl'),
                    model: new api.models.PersonCreation()
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

    var HeaderViewFactory = {
        showView: function(view) {
            if (this.currentView) {
                this.currentView.close();
            }

            this.currentView = view;
            this.currentView.render();
        },
        loggedInHeader: function(data) {
            if (!this.loggedInHeaderView) {
                this.loggedInHeaderView = new api.views.loggedInHeader({
                    el: $('#headerBar-view'),
                    model: new api.models.Logout(),
                    data: data
                });
            }
            return this.loggedInHeaderView;
        },
        loggedOutHeader: function() {
            if(!this.loggedOutHeaderView) {
                this.loggedOutHeaderView = new api.views.loggedOutHeader({
                    el: $('#headerBar-view'),
                    template: api.createTemplate('templates/loggedOutHeader.tpl')
                });
            }
            return this.loggedOutHeaderView;
        }
    }

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
        },
        execute: function(callback, args) {
            //Using a cookie to handle whether or not the user has already been authenticated
            window.session.fetch({
                success: function(model, response) {
                    if (response.isAuthenticated) {
                        var data = { FirstName: response.FirstName, LastName: response.LastName};
                        var view = HeaderViewFactory.loggedInHeader(data);
                        HeaderViewFactory.showView(view);
                        app.router.navigate('timeSheet', true);
                        return false;
                    } else {
                        var view = HeaderViewFactory.loggedOutHeader();
                        HeaderViewFactory.showView(view);
                    }
                },
                error: function(model, response) {
                    console.log("There was an error with the server.");
                }
            });
            if (callback) callback.apply(this, args);
        }
    });
    api.router = new Router();

    return api;
})();

