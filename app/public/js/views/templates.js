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
__p += '<div id="homeTemplate">\n  <div class="row">\n    <div class="small-11 medium-8 large-8 small-centered columns">\n      <div id="homeContent">\n        <div class="row verticalParentHeight">\n          <div class="small-6 columns">\n            <img src="images/logoWithText.jpg"/>\n          </div>\n          <div class="small-6 columns verticalParent">\n            <button id="toLoginPageButton" class="button round expand verticalChild" type="submit">Login</button>\n          </div>\n        </div>\n        <div class="row verticalParentHeight">\n          <div class="small-6 columns">\n            Timesheet<br>Application\n          </div>\n          <div class="small-6 columns verticalParent">\n            <button id="toAccountCreationButton" class="button round expand verticalChild" type="submit">Create Account</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/loggedInHeader.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="top-user-info" style="float: left;">\n    Welcome ' +
((__t = ( FirstName )) == null ? '' : __t) +
' ' +
((__t = ( LastName )) == null ? '' : __t) +
'!\n</div>\n<div style="float: right;">\n    <button id="logoutButton" class="button round expand" type="submit">Logout</button>\n</div>';

}
return __p
};

this["JST"]["templates/loggedOutHeader.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="tel:843-277-0493" class="top-contact-info" style="padding-right: 5px;">\n    <i class="fa fa-phone"></i>\n    843-277-0493\n</a>\n<a href="mailto:info@elevationhealthcare.com" class="top-contact-info"> <i class="fa fa-envelope"></i>\n    info@elevationhealthcare.com\n</a>\n<div style="float: right;">\n    <a target="_blank" href="https://www.facebook.com/ElevationHealthcare" class="top-social-icon">\n        <i class="fa fa-facebook"></i>\n    </a>\n    <a target="_blank" href="https://www.linkedin.com/company/elevation-healthcare" class="top-social-icon">\n        <i class="fa fa-linkedin"></i>\n    </a>\n    <a target="_blank" href="https://plus.google.com/113418667459138730721/about?hl=en" class="top-social-icon">\n        <i class="fa fa-google-plus"></i>\n    </a>\n    <a target="_blank" href="https://twitter.com/elevathealth" class="top-social-icon">\n        <i class="fa fa-twitter"></i>\n    </a>\n</div>';

}
return __p
};

this["JST"]["templates/login.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loginTemplate">\n  <div class="row">\n    <div class="small-12 medium-10 large-10 small-centered columns">\n      <div class="row">\n        <div class="small-11 medium-6 large-6 small-centered columns">\n          <div id="loginContent">\n            <span id="loginIntroText">\n              Already have a login? Great! Sign in below.\n            </span>\n            <form id="loginRequest">\n              <div class="inputWrapper">\n                <input id="email" type="text" name="Email" placeholder="Email">\n                <small class="error hidden"></small>\n              </div>\n              <div class="inputWrapper">\n                <input id="password" type="password" name="Password" placeholder="Password">\n                <small class="error hidden"></small>\n              </div>\n              <div class="row">\n                <div class="small-12 small-centered columns">\n                  <button id="loginButton" class="button round expand" type="button">Login</button>\n                </div>\n              </div>\n              <div class="row">\n                <div class="small-12 columns">\n                  <div class="hidden" id="serverError">\n                  </div>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/loginCreation.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loginCreationTemplate">\n  <div class="row">\n    <div class="small-12 medium-10 large-10 small-centered columns">\n      <div class="row">\n        <div class="small-12 columns">\n          <div id="loginCreationContent">\n            <span id="loginIntroText">\n              Don\'t have login yet? No problem! Provide your authentication key and fill in the information below to get started.\n            </span>\n            <form id="loginCreation">\n              <div class="row">\n                <div class="small-6 columns">\n                  <div class="inputWrapper">\n                    <input id="firstName" type="text" name="FirstName" placeholder="First Name" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n                <div class="small-6 columns">\n                  <div class="inputWrapper">\n                    <input id="lastName" type="text" name="LastName" placeholder="Last Name" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n              </div>\n              <div class="row">\n                <div class="small-6 columns">\n                  <div class="inputWrapper">\n                    <input id="email" type="text" name="Email" placeholder="Email" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n                <div class="small-6 columns">\n                  <div class="inputWrapper">\n                    <input id="emailConfirm" type="text" name="ConfirmEmail" placeholder="Confirm Email" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n              </div>\n              <div class="row">\n                <div class="small-6 columns">\n                  <div class="inputWrapper">\n                    <input id="password" type="password" name="Password" placeholder="Password (Must Include a digit)" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n                <div class="small-6 columns">\n                  <div class="inputWrapper">\n                    <input id="passwordConfirmation" type="password" name="ConfirmPassword" placeholder="Confirm Password" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n              </div>\n              <div class="inputWrapper">\n                <input id="authKey" type="text" name="AuthToken" placeholder="Authentication Key" />\n                <small class=\'error hidden\'></small>\n              </div>\n              <button id="submitButton" class="button round expand">Create</button>\n              <div class="row">\n                <div class="small-12 columns">\n                  <div class="hidden" id="serverError">\n                  </div>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/timeSelector.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="timePickerHeader">\n  <div class="row">\n    <div class="small-12 small-cenetered columns">\n      Week of (monday) to (friday):\n    </div>\n  </div>\n</div>\n<div id="timePickersWrapper">\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">Log In</div>\n    <div class="small-2 columns no-pad-left">Log Out</div>\n    <div class="small-2 columns no-pad-left">Log In</div>\n    <div class="small-2 columns no-pad-left">Log Out</div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n  <div class="row margin-bottom">\n    <div class="small-3 columns">Day (Date)</div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-2 columns no-pad-left">\n      <input class="timer-input" type="text" id="example" />\n    </div>\n    <div class="small-1 columns no-pad-left">Hours</div>\n  </div>\n</div>\n<div id="buttonsWrapper">\n  <div class="row">\n    <div class="small-6 columns">\n      <button id="toLoginPageButton" class="button round expand" type="submit">Upload TimeSheet Photo</button>\n    </div>\n    <div class="small-4 columns">\n      <button id="toAccountCreationButton" class="button round expand" type="submit">Submit</button>\n    </div>\n    <div class="small-2 columns">\n      0\n    </div>\n  </div>\n</div>';

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