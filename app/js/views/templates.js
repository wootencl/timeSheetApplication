this["JST"] = this["JST"] || {};

this["JST"]["templates/clndr.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="clndr-controls">\n  <div class="clndr-previous-button">&lsaquo;</div><!--\n   --><div class="month">' +
((__t = ( month )) == null ? '' : __t) +
'</div><!--\n   --><div class="clndr-next-button">&rsaquo;</div>\n</div>\n<div class="clndr-grid">\n  <div class="days-of-the-week clearfix">\n    ';
 _.each(daysOfTheWeek, function(day) { ;
__p += '\n      <div class="header-day">' +
((__t = ( day )) == null ? '' : __t) +
'</div>\n    ';
 }); ;
__p += '\n  </div>\n  <div class="days clearfix">\n    ';
 _.each(days, function(day) { ;
__p += '\n      <div class="' +
((__t = ( day.classes )) == null ? '' : __t) +
'" id="' +
((__t = ( day.id )) == null ? '' : __t) +
'">\n        <span class="day-number">' +
((__t = ( day.day )) == null ? '' : __t) +
'</span>\n      </div>\n    ';
 }); ;
__p += '\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/home.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="homeTemplate">\n  <div class="row">\n    <div class="small-11 medium-8 large-8 small-centered columns">\n      <div id="homeContent">\n        <div class="row">\n          <div class="small-12 small-centered columns">\n            <img src="images/logoWithText.jpg"/>\n          </div>\n        </div>\n        <div class="row">\n          <div class="small-6 columns">\n            <button id="toLoginPageButton" class="button round expand" type="submit">Login</button>\n          </div>\n          <div class="small-6 columns">\n            <button id="toAccountCreationButton" class="button round expand" type="submit">Create Account</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/login.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loginTemplate">\n  <div class="row">\n    <div class="small-12 medium-10 large-10 small-centered columns">\n      <div class="row">\n        <div class="small-11 medium-6 large-6 small-centered columns">\n          <div id="loginContent">\n            <span id="loginIntroText">\n              Already have a login? Great! Sign in below.\n            </span>\n            <form id="loginRequest" action="api/login">\n              <div class="inputWrapper">\n                <input id="email" type="text" name="email" placeholder="Email">\n                <small class="error">Invalid Email</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="password" type="password" name="password" placeholder="Password">\n                <small class="error">Invalid Password</small>\n              </div>\n              <div class="row">\n                <div class="small-12 small-centered columns">\n                  <button id="loginButton" class="button round expand" type="button">Login</button>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/loginCreation.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loginCreationTemplate">\n  <div class="row">\n    <div class="small-12 medium-10 large-10 small-centered columns">\n      <div class="row">\n        <div class="small-11 medium-6 large-6 small-centered columns">\n          <div id="loginCreationContent">\n            <span id="loginIntroText">\n              Don\'t have login yet? No problem! Provide your authentication key and fill in the information below to get started.\n            </span>\n            <form>\n              <div class="inputWrapper">\n                <input id="authKey" type="text" name="authKey" placeholder="Authentication Key" />\n                <small class=\'error\'>Authentication Key Required</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="name" type="text" name="name" placeholder="Name" />\n                <small class=\'error\'>Name Required</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="email" type="text" name="email" placeholder="Email" />\n                <small class=\'error\'>Email Required</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="emailConfirm" type="text" name="emailConfirm" placeholder="Confirm Email" />\n                <small class=\'error\'>Email Confirmation Required</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="password" type="password" name="password" placeholder="Password" />\n                <small class=\'error\'>Password Required</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" />\n                <small class=\'error\'>Password Confrimation Required</small>\n              </div>\n              <div class="row">\n                <div class="small-12 small-centered columns">\n                  <button id="submitButton" class="button round expand" type="submit">Create</button>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/timeSelector.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="timePickerHeader">\n  <div class="row">\n    <div class="small-12 small-cenetered columns">\n      Week of (monday) to (friday):\n    </div>\n  </div>\n</div>\n<div id="timePickersWrapper">\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">Log In</div>\n    <div class="small-2 columns no-pad-left">Log Out</div>\n    <div class="small-2 columns no-pad-left">Log In</div>\n    <div class="small-2 columns no-pad-left">Log Out</div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n</div>\n<div id="buttonsWrapper">\n  <div class="row">\n    <div class="small-6 columns">\n      <button id="toLoginPageButton" class="button round expand" type="submit">Upload TimeSheet Photo</button>\n    </div>\n    <div class="small-4 columns">\n      <button id="toAccountCreationButton" class="button round expand" type="submit">Submit</button>\n    </div>\n    <div class="small-2 columns">\n      Total Hours\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/timeSheet.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="timeSheetTemplate">\n  <div class="row">\n    <div class="small-12 small-centered columns">\n      <div id="timeSheetContent">\n        <div class="row">\n          <div class="small-6 columns">\n            <div id="timeSelector-view">\n            </div>\n          </div>\n          <div class="small-6 columns">\n            <div id="clndr-view">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};