(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.app = undefined;

var _index = require('./helpers/index');

var _index2 = require('./collections/index');

var _index3 = require('./models/index');

var _index4 = require('./views/index');

var app = exports.app = function () {

    var api = {
        event_bus: _.extend({}, Backbone.Events),
        content: null,
        router: null,
        init: function init() {

            this.content = $('#container');

            window.session = new _index3.Session();

            Backbone.history.start();
            return this;
        },
        changeContent: function changeContent(el) {
            this.content.empty().append(el);
            return this;
        },
        //Global 'createTemplate' function
        createTemplate: function createTemplate(templatePath, data) {
            var templateString = window['JST'][templatePath](data);
            return templateString;
        },
        //This is a helper function that will resize a parent div so that
        //a child of the parent can be vertically aligned within
        resizeFunction: function resizeFunction(elementArray) {
            for (var i = 0; i < elementArray.length; i++) {
                $('#' + elementArray[i] + '>.verticalParentHeight').each(function () {
                    $(".verticalParent", this).css("height", $(this).height());
                });
            }
        }
    };

    //Notes on Factories:
    // - Static views are attached the factory at initialization. Dynamic
    //views are recreated and rereferenced to the factory object.
    var ViewsFactory = {
        createTemplate: function createTemplate(templatePath, data) {
            var templateString = window['JST'][templatePath](data);
            return templateString;
        },
        showView: function showView(view) {
            if (this.currentView) {
                this.currentView.close();
            }

            this.currentView = view;
            this.currentView.render();
        },
        login: function login() {
            if (!this.loginView) {
                this.loginView = new _index4.login({
                    el: $('#container'),
                    template: this.createTemplate('templates/login.tpl'),
                    model: new _index3.PersonLogin()
                });
            }
            return this.loginView;
        },
        home: function home() {
            if (!this.homeView) {
                this.homeView = new _index4.home({
                    el: $('#container'),
                    template: this.createTemplate('templates/home.tpl')
                });
            }
            return this.homeView;
        },
        loginCreation: function loginCreation() {
            if (!this.loginCreationView) {
                this.loginCreationView = new _index4.loginCreation({
                    el: $('#container'),
                    template: this.createTemplate('templates/loginCreation.tpl'),
                    model: new _index3.PersonCreation()
                });
            }
            return this.loginCreationView;
        },
        timeSheet: function timeSheet() {
            this.timeSheetView = new _index4.timeSheet({
                el: $('#container'),
                template: this.createTemplate('templates/timeSheet.tpl')
            });
            return this.timeSheetView;
        },
        admin: function admin() {
            this.AdminView = new _index4.admin({
                el: $('#container'),
                template: this.createTemplate('templates/AdminPanel.tpl'),
                collection: new _index2.Persons()
            });
            return this.AdminView;
        }
    };

    var HeaderViewFactory = {
        showView: function showView(view) {
            if (this.currentView) {
                this.currentView.close();
            }

            this.currentView = view;
            this.currentView.render();
        },
        loggedInHeader: function loggedInHeader(data) {
            this.loggedInHeaderView = new _index4.loggedInHeader({
                el: $('#headerBar-view'),
                model: new _index3.Logout(),
                data: data
            });
            return this.loggedInHeaderView;
        },
        loggedOutHeader: function loggedOutHeader() {
            if (!this.loggedOutHeaderView) {
                this.loggedOutHeaderView = new _index4.loggedOutHeader({
                    el: $('#headerBar-view'),
                    template: api.createTemplate('templates/loggedOutHeader.tpl')
                });
            }
            return this.loggedOutHeaderView;
        }
    };

    var Router = Backbone.Router.extend({
        routes: {
            'AdminPanel': 'admin',
            'timeSheet': 'timeSheet',
            'CreateAccount': 'loginCreation',
            'login': 'login',
            '': 'home'
        },
        admin: function admin() {
            app.event_bus.trigger('admin');
        },
        loginCreation: function loginCreation() {
            app.event_bus.trigger('loginCreation');
        },
        login: function login() {
            app.event_bus.trigger('login');
        },
        home: function home() {
            app.event_bus.trigger('home');
        },
        timeSheet: function timeSheet() {
            app.event_bus.trigger('timeSheet');
        }
    });
    api.router = new Router();

    //Route Watcher
    // This is a replacement for the 'execute' function of the router.
    // Was necessary as not all routes will now fire that execute function with
    // the event driven nature of my navigation.
    // NOTE: Using setTimeout in this function because I was getting some strange behavior in Chrome
    // triggering an event within the 'fetch'. setTimeout ensures the call stack has been fully
    // executed until it attempts to pass the message down the event_bus
    var routeWatcher = {
        inspect: function inspect(callback) {
            //Using a cookie to handle whether or not the user has already been authenticated
            var that = this;
            window.session.fetch({
                success: function success(model, response) {
                    var route = Backbone.history.getFragment();
                    if (response.isAuthenticated) {
                        var data = { FirstName: response.FirstName, LastName: response.LastName };
                        var view = HeaderViewFactory.loggedInHeader(data);
                        HeaderViewFactory.showView(view);
                        if (response.Role === 'ADMIN') {
                            if (_.contains(that.requiresAuthAdmin, route)) {
                                return callback(true);
                            } else {
                                window.setTimeout(function () {
                                    app.event_bus.trigger('admin');
                                }, 0);
                                return callback(false);
                            }
                        } else {
                            if (_.contains(that.requiresAuth, route)) {
                                return callback(true);
                            } else {
                                window.setTimeout(function () {
                                    app.event_bus.trigger('timeSheet');
                                }, 0);
                                return callback(false);
                            }
                        }
                    } else {
                        var view = HeaderViewFactory.loggedOutHeader();
                        HeaderViewFactory.showView(view);
                        if (_.contains(that.notRequireAuth, route)) {
                            return callback(true);
                        } else {
                            window.setTimeout(function () {
                                app.event_bus.trigger('login');
                            }, 0);
                            return callback(false);
                        }
                    }
                },
                error: function error(model, response) {
                    console.log("There was an error with the server.");
                }
            });
        },
        requiresAuthAdmin: ['AdminPanel'],
        requiresAuth: ['timeSheet'],
        notRequireAuth: ['CreateAccount', 'login', '']
    };

    // Tying navigation calls into an event driven architecture
    api.event_bus.bind('home', function () {
        api.router.navigate('');
        routeWatcher.inspect(function (continueRouting) {
            if (continueRouting) {
                var view = ViewsFactory.home();
                ViewsFactory.showView(view);
            }
        });
    });
    api.event_bus.bind('login', function () {
        api.router.navigate('login');
        routeWatcher.inspect(function (continueRouting) {
            if (continueRouting) {
                var view = ViewsFactory.login();
                ViewsFactory.showView(view);
            }
        });
    });
    api.event_bus.bind('loginCreation', function () {
        app.router.navigate('CreateAccount');
        routeWatcher.inspect(function (continueRouting) {
            if (continueRouting) {
                var view = ViewsFactory.loginCreation();
                ViewsFactory.showView(view);
            }
        });
    });
    api.event_bus.bind('admin', function () {
        app.router.navigate('AdminPanel');
        routeWatcher.inspect(function (continueRouting) {
            if (continueRouting) {
                var view = ViewsFactory.admin();
                ViewsFactory.showView(view);
            }
        });
    });
    api.event_bus.bind('timeSheet', function () {
        app.router.navigate('timeSheet');
        routeWatcher.inspect(function (continueRouting) {
            if (continueRouting) {
                var view = ViewsFactory.timeSheet();
                ViewsFactory.showView(view);
            }
        });
    });

    return api;
}();

},{"./collections/index":4,"./helpers/index":5,"./models/index":17,"./views/index":21}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Persons = undefined;

var _index = require('../models/index');

var Persons = exports.Persons = Backbone.Collection.extend({
  url: '/persons',
  model: _index.Person
});

},{"../models/index":17}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeSheets = undefined;

var _index = require('../models/index');

var TimeSheets = exports.TimeSheets = Backbone.Collection.extend({
  url: '/timeSheets',
  model: _index.TimeSheet,
  parse: function parse(response) {
    return response.results;
  }
});

},{"../models/index":17}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Persons = require('./Persons');

Object.keys(_Persons).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Persons[key];
    }
  });
});

var _TimeSheets = require('./TimeSheets');

Object.keys(_TimeSheets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TimeSheets[key];
    }
  });
});

},{"./Persons":2,"./TimeSheets":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modifyBackbone = require('./modifyBackbone');

Object.keys(_modifyBackbone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modifyBackbone[key];
    }
  });
});

var _modifyJquery = require('./modifyJquery');

Object.keys(_modifyJquery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modifyJquery[key];
    }
  });
});

},{"./modifyBackbone":6,"./modifyJquery":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Overwriting the built in view.remove() function.
// Reasoning: I decided to do it this way because of the issues arising from
// the acutal destruction of my "#container" div
var modifyBackbone = exports.modifyBackbone = function () {
    Backbone.View.prototype.remove = function () {
        this.$el.children().remove();
        this.$el.empty().off();
        this.stopListening();
        return this;
    };
    // writing a custom close function for backbone views for the purpose of garbage collection
    Backbone.View.prototype.close = function () {
        this.remove();
        this.unbind();
        //prototype necessary to disconnect any model and collection events attached to a view.
        if (this.onClose) {
            this.onClose();
        }
    };
}();

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var modifyJquery = exports.modifyJquery = function () {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
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
}();

},{}],8:[function(require,module,exports){
'use strict';

var _app = require('./app');

$(document).ready(function () {
  //Initialize Foundation
  $(document).foundation();

  _app.app.init();
});

},{"./app":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Logout = exports.Logout = Backbone.Model.extend({
  urlRoot: '/logout'
});

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Person = exports.Person = Backbone.Model.extend({});

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PersonCreation = exports.PersonCreation = Backbone.Model.extend({
  urlRoot: '/loginCreation',
  defaults: {
    AuthToken: '',
    FirstName: '',
    LastName: '',
    Email: '',
    ConfirmEmail: '',
    Password: '',
    ConfirmPassword: ''
  },
  validation: {
    AuthToken: [{
      required: true
    }, {
      length: 32,
      pattern: /^[0-9a-fA-F]+$/,
      msg: 'Invalid Authentication Token format'
    }],
    FirstName: [{
      required: true
    }, {
      pattern: /^[a-zA-Z]+$/,
      msg: 'Invalid First Name'
    }],
    LastName: [{
      required: true
    }, {
      pattern: /^[a-zA-Z]+$/,
      msg: 'Invalid Last Name'
    }],
    Email: [{
      required: true
    }, {
      pattern: 'email',
      msg: 'Invalid Email'
    }],
    ConfirmEmail: [{
      required: true
    }, {
      equalTo: 'Email',
      msg: 'Does not match Email'
    }],
    Password: [{
      required: true
    }, {
      //One digit and one character minimum
      pattern: /^(?=.*[\d])(?=.*[A-Za-z])[\w\d!?@#$%_]{7,15}$/,
      msg: 'Invalid Password. Must include a digit'
    }],
    ConfirmPassword: [{
      required: true
    }, {
      equalTo: 'Password',
      msg: 'Does not match Password'
    }]
  }
});

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PersonLogin = exports.PersonLogin = Backbone.Model.extend({
  urlRoot: '/login',
  defaults: {
    Email: '',
    Password: ''
  },
  validation: {
    Email: [{
      required: true
    }, {
      pattern: 'email',
      msg: 'Invalid Email'
    }],
    Password: {
      required: true
    }
  }
});

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ResendSignupEmail = exports.ResendSignupEmail = Backbone.Model.extend({
  urlRoot: '/resendSignupEmail'
});

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Session = exports.Session = Backbone.Model.extend({
  urlRoot: '/session'
});

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TimeSheet = exports.TimeSheet = Backbone.Model.extend({
  idAttribute: 'weekStartDate'
});

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TokenCreation = exports.TokenCreation = Backbone.Model.extend({
  urlRoot: '/tokenCreation',
  validation: {
    Email: [{
      required: true
    }, {
      pattern: 'email',
      msg: 'Invalid Email'
    }],
    ConfirmEmail: [{
      required: true
    }, {
      equalTo: 'Email',
      msg: 'Does not match Email'
    }]
  }
});

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Logout = require('./Logout');

Object.keys(_Logout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Logout[key];
    }
  });
});

var _Person = require('./Person');

Object.keys(_Person).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Person[key];
    }
  });
});

var _PersonCreation = require('./PersonCreation');

Object.keys(_PersonCreation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PersonCreation[key];
    }
  });
});

var _PersonLogin = require('./PersonLogin');

Object.keys(_PersonLogin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PersonLogin[key];
    }
  });
});

var _ResendSignupEmail = require('./ResendSignupEmail');

Object.keys(_ResendSignupEmail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ResendSignupEmail[key];
    }
  });
});

var _Session = require('./Session');

Object.keys(_Session).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Session[key];
    }
  });
});

var _TimeSheet = require('./TimeSheet');

Object.keys(_TimeSheet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TimeSheet[key];
    }
  });
});

var _TokenCreation = require('./TokenCreation');

Object.keys(_TokenCreation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TokenCreation[key];
    }
  });
});

},{"./Logout":9,"./Person":10,"./PersonCreation":11,"./PersonLogin":12,"./ResendSignupEmail":13,"./Session":14,"./TimeSheet":15,"./TokenCreation":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.admin = undefined;

var _index = require('../models/index');

var _index2 = require('../collections/index');

var _index3 = require('./index');

var admin = exports.admin = Backbone.View.extend({
  initialize: function initialize(data) {
    this.options = data;

    this.tokenCreationModel = new _index.TokenCreation();

    this.template = _.template(this.options.template);

    Backbone.Validation.bind(this, {
      model: this.tokenCreationModel,
      valid: function valid(view, attr) {
        var element = view.$("[name=" + attr + "]");
        var parent = element.closest('.inputWrapper');
        element.removeClass('error');
        parent.find('small.error').html('').addClass('hidden');
      },
      invalid: function invalid(view, attr, error) {
        //Hide server errors if input error arises
        $('#serverError').html('').addClass('hidden');
        var element = view.$("[name=" + attr + "]");
        var parent = element.closest('.inputWrapper');
        element.addClass('error');
        parent.find('small.error').html(error).removeClass('hidden');
      }
    });
  },
  render: function render() {
    var that = this;

    this.unverifiedPersons = new _index2.Persons();
    this.verifiedPersons = new _index2.Persons();

    //Render Parent
    that.$el.html(that.template({}));

    this.verifiedPersons.fetch({
      data: { verified: true },
      success: function success(collection, response, options) {
        that.verifiedCollectionView = new _index3.personCollectionView({
          collection: that.verifiedPersons,
          childView: _index3.verifiedUser,
          el: $('#verifiedUsers-view')
        });

        that.verifiedCollectionView.render();
      }
    });

    this.unverifiedPersons.fetch({
      data: { verified: false },
      success: function success(collection, response, options) {
        that.unverifiedCollectionView = new _index3.personCollectionView({
          collection: that.unverifiedPersons,
          childView: _index3.unverifiedUser,
          el: $('#unverifiedUsers-view')
        });

        that.unverifiedCollectionView.render();
      }
    });

    this.delegateEvents();
  },
  events: {
    'click .verified.user': 'expandUserInfo',
    'click .unverified.user': 'expandUserInfo',
    'click #submitCreateUserButton': 'createToken'
  },
  expandUserInfo: function expandUserInfo(element) {
    var toggleElement = $(element.currentTarget).next('.personInfo');
    if ($(toggleElement).height() !== 0) {
      $(toggleElement).height("0px");
    } else {
      this.fetchUserInfo(toggleElement);
    }
  },
  fetchUserInfo: function fetchUserInfo(toggleElement) {
    var totalHeight = 0;
    $(toggleElement).children().each(function () {
      totalHeight += $(this).outerHeight(true);
    });
    $(toggleElement).height(totalHeight + "px");
  },
  createToken: function createToken() {
    var that = this;
    event.preventDefault();
    var data = $('#createUserRequest').serializeObject();
    this.tokenCreationModel.set(data);
    if (this.tokenCreationModel.isValid(true)) {
      this.tokenCreationModel.save({
        Email: data.Email
      }, {
        success: function success(model, response) {
          $('#signupEmailModal').foundation('reveal', 'open');
          $('#serverError').html('').addClass('hidden');
          $('#createUserRequest')[0].reset();
          that.unverifiedCollectionView.collection.fetch({
            data: { verified: false }
          });
        },
        error: function error(model, response) {
          $('#serverError').html(response.responseJSON.message).removeClass('hidden');
        }
      });
    }
  }
});

},{"../collections/index":4,"../models/index":17,"./index":21}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calendar = undefined;

var _app = require('../app');

var calendar = exports.calendar = Backbone.View.extend({
  initialize: function initialize(data) {
    this.options = data;
    this.listenTo(_app.app.event_bus, 'inputChange', this.registerInputChange);
    this.timeSelectorInputChanged = false;
    this.selectedWeekId = '';
  },
  render: function render() {
    this.setElement($(this.options.el));
    var that = this;
    $(this.options.el).clndr({
      render: function render(data) {
        this.template = _.template(_app.app.createTemplate('templates/clndr.tpl', data));
        return this.template;
      },
      clickEvents: {
        onMonthChange: function onMonthChange(month) {
          that.fetchCollection(month, function (err) {
            if (err) return console.log(err);
            var weekSelectorDate = moment.utc(that.collection.at(0).get('weekStartDate')).format('YYYY-MM-DD');
            that.renderNextPrevButtons();
            that.renderDays(weekSelectorDate);
          });
        }
      }
    });

    this.fetchCollection(this.options.renderWeekStartDate, function (err) {
      that.renderDays(that.options.renderWeekStartDate);
      that.renderNextPrevButtons();
      that.delegateEvents();
    });
  },
  events: {
    'click .weekDiv': 'checkInputWeekSelected',
    'click #changeTimeSheetNo': 'unregisterWeekSelected',
    'click #changeTimeSheetYes': 'registerWeekSelected'
  },
  registerInputChange: function registerInputChange() {
    this.timeSelectorInputChanged = true;
  },
  renderDays: function renderDays(weekSelectorDate) {
    //render week divs on top of calendar
    var daysContainer = document.getElementById('daysContainer');
    var startWeekDate = moment.utc(this.collection.at(0).get('weekStartDate'));
    var endWeekDate = moment.utc(this.collection.at(this.collection.length - 1).get('weekStartDate'));
    for (startWeekDate; moment(startWeekDate).isSameOrBefore(endWeekDate); startWeekDate = moment(startWeekDate).add(1, 'w')) {
      var weekDiv = document.createElement('div');
      var weekDivSpan = document.createElement('span');
      var formattedDate = moment(startWeekDate).format('YYYY-MM-DD');
      var weekStartDayDiv = document.getElementById(formattedDate);
      weekDiv.id = formattedDate + '-weekDiv';
      weekDiv.className = 'weekDiv';

      //complete || incomplete || empty
      var model = this.collection.find(function (timeSheet) {
        var modelStartDate = moment(timeSheet.get('weekStartDate'));
        return moment(modelStartDate).isSame(startWeekDate);
      });
      if (model) {
        if (model.get('totalTime') === null) {
          weekDiv.className += ' incomplete';
          weekDiv.dataset.date = formattedDate;
          weekDivSpan.innerHTML = 'Incomplete';
        } else {
          weekDiv.className += ' complete';
          weekDiv.dataset.date = formattedDate;
          weekDivSpan.innerHTML = 'Complete';
        }
      }
      weekDiv.appendChild(weekDivSpan);
      daysContainer.appendChild(weekDiv);

      //Shift to location

      weekDiv.style.top = weekStartDayDiv.offsetTop + 'px';
      weekDiv.style.left = weekStartDayDiv.offsetLeft + 'px';
    }
    this.shiftWeekSelector(weekSelectorDate);
  },
  checkInputWeekSelected: function checkInputWeekSelected(element) {
    this.selectedWeekId = element.currentTarget.id;
    if (this.timeSelectorInputChanged) {
      //Temporarily shifting view element to global to catch modal events
      this.setElement($('#changeTimeSheetModal').foundation('reveal', 'open'));
    } else {
      this.registerWeekSelected();
    }
  },
  unregisterWeekSelected: function unregisterWeekSelected() {
    $('#changeTimeSheetModal').foundation('reveal', 'close');
    //switching back to proper view element
    this.setElement($(this.options.el));
  },
  registerWeekSelected: function registerWeekSelected() {
    $('#changeTimeSheetModal').foundation('reveal', 'close');
    //switching back to proper view element
    this.setElement($(this.options.el));
    var weekDiv = document.getElementById(this.selectedWeekId);
    $('.selected').removeClass('selected');
    this.shiftWeekSelector(weekDiv.dataset.date);
    weekDiv.className += ' selected';
  },
  shiftWeekSelector: function shiftWeekSelector(date) {
    this.trigger('timeSelector', date);
    this.timeSelectorInputChanged = false;
    var weekStartDayDiv = document.getElementById(date);
    var weekSelector = document.getElementById('weekSelector');
    var weekDiv = document.getElementById(date + '-weekDiv');
    weekDiv.className += ' selected';
    weekSelector.style.top = weekStartDayDiv.offsetTop + 'px';
    weekSelector.style.left = weekStartDayDiv.offsetLeft + 'px';
  },
  renderNextPrevButtons: function renderNextPrevButtons() {
    if (this.options.next) {
      $('.clndr-next-button').removeClass('inactive');
    } else {
      $('.clndr-next-button').addClass('inactive');
    }
    if (this.options.prev) {
      $('.clndr-previous-button').removeClass('inactive');
    } else {
      $('.clndr-previous-button').addClass('inactive');
    }
  },
  fetchCollection: function fetchCollection(date, done) {
    var that = this;
    var initializedSelectStartDate, initializedSelectEndDate;

    //Check for prev/next month mondays viewable
    var prevMonthMonday = document.getElementsByClassName('last-month monday');
    if (prevMonthMonday.length) {
      initializedSelectStartDate = prevMonthMonday[0].id;
    } else {
      initializedSelectStartDate = moment(date).startOf('month').format('YYYY-MM-DD');
    }
    var nextMonthMonday = document.getElementsByClassName('next-month monday');
    if (nextMonthMonday.length) {
      initializedSelectEndDate = nextMonthMonday[0].id;
    } else {
      initializedSelectEndDate = moment(date).endOf('month').format('YYYY-MM-DD');
    }
    this.collection.fetch({
      reset: true,
      data: {
        timeSelectorWeekDate: moment(date).startOf('isoWeek').format('YYYY-MM-DD'),
        selectStartDate: initializedSelectStartDate,
        selectEndDate: initializedSelectEndDate
      },
      success: function success(collection, response, options) {
        that.options.next = response.next;
        that.options.prev = response.prev;
        done(null);
      },
      error: function error(collection, response, options) {
        //handle server error
        done(err);
      }
    });
  }
}); //NOTES:
// - Reading it sounds like innerHTML opens the possibility for XSS attacks
// though only when you are using user input. Just something to keep in mind.
// - Next/Prev month rerenders the 'days' subview of the calendar. With that,
// I'm recreating the necessary DOM elements each time.

},{"../app":1}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.home = undefined;

var _app = require('../app');

var home = exports.home = Backbone.View.extend({
    template: null,
    initialize: function initialize(data) {
        var resizes = ['homeContent'];
        $(window).resize(_.throttle(function () {
            _app.app.resizeFunction(resizes);
        }, 1000));

        this.options = data;
        this.template = _.template(this.options.template);
        this.render();
    },
    events: {
        'click #toLoginPageButton': 'toLogin',
        'click #toAccountCreationButton': 'toLoginCreation'
    },
    render: function render() {
        this.$el.html(this.template({}));
        this.delegateEvents();
        //Making it so the 'trigger' call is next in the event
        //queue after the rendering
        setTimeout(function () {
            $(window).trigger('resize');
        }, 0);
    },
    toLogin: function toLogin() {
        _app.app.event_bus.trigger('login');
    },
    toLoginCreation: function toLoginCreation() {
        _app.app.event_bus.trigger('loginCreation');
    }
});

},{"../app":1}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _admin = require('./admin');

Object.keys(_admin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _admin[key];
    }
  });
});

var _calendar = require('./calendar');

Object.keys(_calendar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _calendar[key];
    }
  });
});

var _home = require('./home');

Object.keys(_home).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _home[key];
    }
  });
});

var _loggedInHeader = require('./loggedInHeader');

Object.keys(_loggedInHeader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loggedInHeader[key];
    }
  });
});

var _loggedOutHeader = require('./loggedOutHeader');

Object.keys(_loggedOutHeader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loggedOutHeader[key];
    }
  });
});

var _login = require('./login');

Object.keys(_login).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _login[key];
    }
  });
});

var _loginCreation = require('./loginCreation');

Object.keys(_loginCreation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loginCreation[key];
    }
  });
});

var _personCollection = require('./personCollection');

Object.keys(_personCollection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _personCollection[key];
    }
  });
});

var _timeSelector = require('./timeSelector');

Object.keys(_timeSelector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _timeSelector[key];
    }
  });
});

var _timeSelectorDay = require('./timeSelectorDay');

Object.keys(_timeSelectorDay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _timeSelectorDay[key];
    }
  });
});

var _timeSheet = require('./timeSheet');

Object.keys(_timeSheet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _timeSheet[key];
    }
  });
});

var _unverifiedUser = require('./unverifiedUser');

Object.keys(_unverifiedUser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _unverifiedUser[key];
    }
  });
});

var _verifiedUser = require('./verifiedUser');

Object.keys(_verifiedUser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _verifiedUser[key];
    }
  });
});

},{"./admin":18,"./calendar":19,"./home":20,"./loggedInHeader":22,"./loggedOutHeader":23,"./login":24,"./loginCreation":25,"./personCollection":26,"./timeSelector":27,"./timeSelectorDay":28,"./timeSheet":29,"./unverifiedUser":30,"./verifiedUser":31}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loggedInHeader = undefined;

var _app = require('../app');

var loggedInHeader = exports.loggedInHeader = Backbone.View.extend({
    initialize: function initialize(data) {
        this.options = data;
    },
    render: function render() {
        this.template = _.template(_app.app.createTemplate('templates/loggedInHeader.tpl', this.options.data));
        this.$el.html(this.template({}));
        this.delegateEvents();
    },
    events: {
        'click #logoutButton': 'logout'
    },
    logout: function logout() {
        this.model.fetch({
            success: function success(model, response) {
                _app.app.event_bus.trigger('login');
            }
        });
    }
});

},{"../app":1}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var loggedOutHeader = exports.loggedOutHeader = Backbone.View.extend({
    template: null,
    initialize: function initialize(data) {
        this.options = data;
        this.template = _.template(this.options.template);
    },
    render: function render() {
        this.$el.html(this.template({}));
        this.delegateEvents();
    }
});

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = undefined;

var _app = require('../app');

var login = exports.login = Backbone.View.extend({
    template: null,
    initialize: function initialize(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        this.render();

        Backbone.Validation.bind(this, {
            valid: function valid(view, attr) {
                var element = view.$("[name=" + attr + "]");
                var parent = element.closest('.inputWrapper');
                element.removeClass('error');
                parent.find('small.error').html('').addClass('hidden');
            },
            invalid: function invalid(view, attr, error) {
                //Hide server errors if input error arises
                $('#serverError').html('').addClass('hidden');
                var element = view.$("[name=" + attr + "]");
                var parent = element.closest('.inputWrapper');
                element.addClass('error');
                parent.find('small.error').html(error).removeClass('hidden');
            }
        });
    },
    events: {
        'click #loginButton': 'login',
        'click #homeButton': 'home'
    },
    render: function render() {
        this.$el.html(this.template({}));
        this.delegateEvents();
    },
    login: function login(event) {
        event.preventDefault();
        var data = $('#loginRequest').serializeObject();
        this.model.set(data);
        if (this.model.isValid(true)) {
            this.model.save({
                Email: data.Email,
                Password: data.Password
            }, {
                success: function success(model, response) {
                    _app.app.event_bus.trigger('timeSheet');
                },
                error: function error(model, response) {
                    $('#serverError').html(response.responseJSON.message).removeClass('hidden');
                }
            });
        }
    },
    home: function home() {
        _app.app.event_bus.trigger('home');
    }
});

},{"../app":1}],25:[function(require,module,exports){
//Validation Source: http://jsfiddle.net/thedersen/udXL5/

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loginCreation = undefined;

var _app = require('../app');

var loginCreation = exports.loginCreation = Backbone.View.extend({
    template: null,
    initialize: function initialize(data) {
        this.options = data;
        this.template = _.template(this.options.template);
        this.render();

        Backbone.Validation.bind(this, {
            valid: function valid(view, attr) {
                var element = view.$("[name=" + attr + "]");
                var parent = element.closest('.inputWrapper');
                element.removeClass('error');
                parent.find('small.error').html('').addClass('hidden');
            },
            invalid: function invalid(view, attr, error) {
                //Hide server errors if input error arises
                $('#serverError').html('').addClass('hidden');
                var element = view.$("[name=" + attr + "]");
                var parent = element.closest('.inputWrapper');
                element.addClass('error');
                parent.find('small.error').html(error).removeClass('hidden');
            }
        });
    },
    events: {
        "click #submitButton": "loginCreation",
        "click #homeButton": "home"
    },
    render: function render() {
        this.$el.html(this.template({}));
        this.delegateEvents();
    },
    loginCreation: function loginCreation() {
        event.preventDefault();
        var data = $('#loginCreation').serializeObject();
        this.model.set(data);
        if (this.model.isValid(true)) {
            this.model.save({
                FirstName: data.FirstName,
                LastName: data.LastName,
                Email: data.Email,
                Password: data.Password,
                AuthToken: data.AuthToken
            }, {
                success: function success(model, response) {
                    _app.app.event_bus.trigger('timeSheet');
                },
                error: function error(model, response) {
                    $('#serverError').html(response.responseJSON.message).removeClass('hidden');
                }
            });
        }
    },
    home: function home() {
        _app.app.event_bus.trigger('home');
    }
});

},{"../app":1}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Help: http://liquidmedia.org/blog/2011/02/backbone-js-part-3/

var personCollectionView = exports.personCollectionView = Backbone.View.extend({
  initialize: function initialize(options) {
    this.personView = options.childView;

    this.personViews = {};

    this.collection.each(this.add, this);
    this.listenTo(this.collection, 'add', this.add);
    this.listenTo(this.collection, 'remove', this.removePerson);
  },
  add: function add(person) {
    var personView = this.personViews[person.id] || new this.personView({
      model: person
    });
    this.listenTo(personView, 'remove', this.removePerson);
    this.personViews[person.id] = personView;

    if (this.rendered) {
      $(this.el).append(personView.render().el);
    }
  },
  removePerson: function removePerson(person) {
    var viewToRemove = this.personViews[person.id];
    viewToRemove.close();
  },
  render: function render() {
    this.rendered = true;
    this.collection.each(function (person) {
      this.$el.append(this.personViews[person.id].render().el);
    }, this);
  }
});

},{}],27:[function(require,module,exports){
//Not particularly pleased with the nongeneric way I'm implementing this at the moment.
//Possible alternative is to use actual dates instead of mondayTime, tuesdayTime, etc.
// Ex: 2016-05-07-Time

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeSelector = undefined;

var _app = require('../app');

var _index = require('./index');

var timeSelector = exports.timeSelector = Backbone.View.extend({
  initialize: function initialize(data) {
    this.options = data;
    this.dayIds = ['mondayTime', 'tuesdayTime', 'wednesdayTime', 'thursdayTime', 'fridayTime'];
    this.listenTo(_app.app.event_bus, 'totalTime', this.computeTotalTime);
    this.timeSelectorDayViews = {};
  },
  render: function render() {
    this.template = _.template(_app.app.createTemplate('templates/timeSelector.tpl', { weekStartDate: this.model.get('weekStartDate'), totalTime: this.model.get('totalTime') }));
    $(this.options.el).html(this.template({}));

    for (var i = 0; i < this.dayIds.length; i++) {
      this.timeSelectorDayViews[i] = new _index.timeSelectorDay({
        el: '#timePickersWrapper',
        time: this.model.get(this.dayIds[i]),
        date: moment(this.model.get('weekStartDate')).add(i, 'd')
      }).render();
    }
    $('input').timepicker({
      noneOption: true,
      step: 15,
      disableTouchKeyboard: true,
      disableTextInput: true
    });
    if (this.checkTotalTime() > 0) {
      this.handlePreviouslySubmitted();
    }
    this.delegateEvents();
  },
  checkTotalTime: function checkTotalTime() {
    var totalTimeDiv = document.getElementById('totalTime');
    var totalTime = parseFloat(totalTimeDiv.innerHTML);
    if (totalTime > 0) {
      totalTimeDiv.style.backgroundColor = '#69a776';
    } else {
      totalTimeDiv.style.backgroundColor = '#dd3c3c';
    }
    return totalTime;
  },
  computeTotalTime: function computeTotalTime() {
    var totalTime = 0;
    for (var i = 0; i < this.dayIds.length; i++) {
      totalTime += this.timeSelectorDayViews[i].totalHours;
    }
    document.getElementById('totalTime').innerHTML = totalTime;
    this.checkTotalTime();
  },
  handlePreviouslySubmitted: function handlePreviouslySubmitted() {
    var coverDiv = document.getElementById('timePickersCover');
    var coverInnerDiv = document.createElement('div');
    var coverInnerDivSpan = document.createElement('div');
    var resubmissionButton = document.createElement('button');
    coverDiv.className = 'active';
    resubmissionButton.innerHTML = 'Request Review';
    resubmissionButton.className = 'expand';
    coverInnerDivSpan.innerHTML = alreadySubmittedInfo;
    coverInnerDiv.appendChild(coverInnerDivSpan);
    coverInnerDiv.appendChild(resubmissionButton);
    coverDiv.appendChild(coverInnerDiv);
  },
  onClose: function onClose() {
    for (var key in this.timeSelectorDayViews) {
      if (this.timeSelectorDayViews.hasOwnProperty(key)) {
        this.timeSelectorDayViews[key].close();
      }
    }
  }
});

var alreadySubmittedInfo = 'This timesheet has already been submitted. If you would like \
to resubmit please request a review.';

},{"../app":1,"./index":21}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeSelectorDay = undefined;

var _app = require('../app');

var timeSelectorDay = exports.timeSelectorDay = Backbone.View.extend({
  constructor: function constructor(options) {
    this.options = _.extend({}, options); // make a copy and use it.
    this.options.formattedDate = moment(this.options.date).format('YYYY-MM-DD');
    //this.events = _.clone(this.events) || {};
    this.template = _.template(_app.app.createTemplate('templates/timeSelectorDay.tpl', this.options));

    Backbone.View.prototype.constructor.apply(this, arguments);
  },
  initialize: function initialize() {
    this.totalHours = 0;
  },
  render: function render() {
    this.$el.append(this.template({}));
    this.delegateEvents(_.extend(_.clone(this.events), { 'change .input-2016-10-31': 'test' }));
    this.checkTotalTime();
    return this;
  },
  test: function test() {
    console.log('EVENTS: ', this.events);
  },
  inputCheck: function inputCheck() {
    var totalTimeDiv = document.getElementById('totalHours-' + this.options.formattedDate);
    var totalTime = 0;
    //compute total hours
    var morningLoginHour = $('#timeselectors-' + this.options.formattedDate + ' #morning-login').val();
    var morningLogoutHourElement = $('#timeselectors-' + this.options.formattedDate + ' #morning-logout');
    if (morningLoginHour) {
      morningLogoutHourElement.timepicker('option', { 'minTime': morningLoginHour });
    }
    var morningLogoutHour = morningLogoutHourElement.val();
    var morningHours = moment(morningLogoutHour, 'LT').diff(moment(morningLoginHour, 'LT'), 'h', true);
    if (morningHours >= 0) {
      totalTime += morningHours;
    }
    var afternoonLoginHour = $('#timeselectors-' + this.options.formattedDate + ' #afternoon-login').val();
    var afternoonLogoutHourElement = $('#timeselectors-' + this.options.formattedDate + ' #afternoon-logout');
    if (afternoonLoginHour) {
      afternoonLogoutHourElement.timepicker('option', { 'minTime': afternoonLoginHour });
    }
    var afternoonLogoutHour = afternoonLogoutHourElement.val();
    var afternoonHours = moment(afternoonLogoutHour, 'LT').diff(moment(afternoonLoginHour, 'LT'), 'h', true);
    if (afternoonHours >= 0) {
      totalTime += afternoonHours;
    }
    totalTimeDiv.innerHTML = totalTime;
    this.checkTotalTime();
    _app.app.event_bus.trigger('totalTime');
    _app.app.event_bus.trigger('inputChange');
  },
  checkTotalTime: function checkTotalTime() {
    var totalTimeDiv = this.$('#totalHours-' + this.options.formattedDate),
        totalTime = parseFloat(totalTimeDiv.html());

    totalTimeDiv.css('background-color', totalTime > 0 ? '#69a776' : '#dd3c3c');
    this.totalHours = totalTime;
  }
});

},{"../app":1}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.timeSheet = undefined;

var _index = require('../collections/index');

var _index2 = require('./index');

var timeSheet = exports.timeSheet = Backbone.View.extend({
    initialize: function initialize(data) {
        var initializedWeekStartDate = moment().startOf('isoWeek').format('YYYY-MM-DD');

        this.options = data;
        this.template = _.template(this.options.template);
        this.timeSheets = new _index.TimeSheets();
        this.calendarView = new _index2.calendar({
            el: '#clndr-view',
            renderWeekStartDate: initializedWeekStartDate,
            collection: this.timeSheets
        });

        this.listenTo(this.calendarView, 'timeSelector', this.renderTimeSelector);
    },
    render: function render() {
        var initializedWeekStartDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
        //Render Parent
        this.$el.html(this.template({}));

        //Render Calendar
        this.calendarView.render();
        this.delegateEvents();
    },
    renderTimeSelector: function renderTimeSelector(date) {
        var model = this.timeSheets.find(function (timeSheet) {
            var modelStartDate = moment.utc(timeSheet.get('weekStartDate')).format('YYYY-MM-DD');
            return moment(modelStartDate).isSame(date);
        });
        if (this.timeSelectorView) {
            this.timeSelectorView.close();
        }
        this.timeSelectorView = new _index2.timeSelector({
            el: '#timeSelector-view',
            model: model
        });
        this.timeSelectorView.render();
    }
});

},{"../collections/index":4,"./index":21}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unverifiedUser = undefined;

var _index = require('../models/index');

var _app = require('../app');

var unverifiedUser = exports.unverifiedUser = Backbone.View.extend({
    initialize: function initialize(data) {
        this.options = data;
        this.resendSignupEmailModel = new _index.ResendSignupEmail();
    },
    render: function render() {
        this.template = _.template(_app.app.createTemplate('templates/unverifiedUser.tpl', { person: this.model.attributes }));
        this.$el.html(this.template({}));
        this.delegateEvents();
        return this;
    },
    events: {
        'click .deleteButton': 'delete',
        'click .resendButton': 'resendSignupEmail'
    },
    delete: function _delete() {
        var that = this;
        $('#deleteModal').foundation('reveal', 'open');
        $(document).on('opened.fndtn.reveal', '#deleteModal[data-reveal]', function () {
            $('#deleteYes').click(function () {
                that.model.destroy();
                $('#deleteModal[data-reveal]').foundation('reveal', 'close');
                modalListenerCleanup();
            });
            $('#deleteNo').click(function (event) {
                $('#deleteModal[data-reveal]').foundation('reveal', 'close');
                modalListenerCleanup();
            });
        });

        function modalListenerCleanup() {
            $(document).off('opened.fndtn.reveal');
            $('#deleteYes').off('click');
            $('#deleteNo').off('click');
        }
    },
    resendSignupEmail: function resendSignupEmail() {
        var that = this;
        this.resendSignupEmailModel.save({
            Email: this.model.get('Email'),
            Token: this.model.get('id')
        }, {
            success: function success(model, response) {
                $('#resendSignupEmailModal').foundation('reveal', 'open');
            },
            error: function error(model, response) {
                //Some sort of error handling here
            }
        });
        console.log();
    }
});

},{"../app":1,"../models/index":17}],31:[function(require,module,exports){
// NOTES:
// - I seperated this and unverified user as I intend on putting a large amount more
// logic in the 'verified user' view.

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifiedUser = undefined;

var _app = require('../app');

var verifiedUser = exports.verifiedUser = Backbone.View.extend({
    initialize: function initialize(data) {
        this.options = data;
    },
    render: function render() {
        this.template = _.template(_app.app.createTemplate('templates/verifiedUser.tpl', { person: this.model.attributes }));
        this.$el.html(this.template({}));
        this.delegateEvents();
        return this;
    },
    events: {
        'click .deleteButton': 'delete'
    },
    delete: function _delete() {
        var that = this;
        $(document).foundation('reveal', 'reflow');
        $('#deleteModal').foundation('reveal', 'open');
        $(document).on('opened.fndtn.reveal', '#deleteModal[data-reveal]', function () {
            $('#deleteYes').click(function () {
                that.model.destroy();
                $('#deleteModal[data-reveal]').foundation('reveal', 'close');
                modalListenerCleanup();
            });
            $('#deleteNo').click(function (event) {
                $('#deleteModal[data-reveal]').foundation('reveal', 'close');
                modalListenerCleanup();
            });
        });

        function modalListenerCleanup() {
            $(document).off('opened.fndtn.reveal');
            $('#deleteYes').off('click');
            $('#deleteNo').off('click');
        }
    }
});

},{"../app":1}]},{},[8])


//# sourceMappingURL=bundle.js.map
