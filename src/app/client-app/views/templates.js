this["JST"] = this["JST"] || {};

this["JST"]["templates/AdminPanel.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="adminTemplate">\n  <div class="row small-collapse medium-uncollapse">\n    <div class="small-12 medium-10 small-centered columns">\n      <div id="adminContent">\n        <div class="row small-collapse medium-uncollapse">\n          <div class="small-12 medium-5 large-5 columns">\n            <img src="images/logoWithText.jpg"/>\n            <div id="adminPanelTitle">\n              Adminstration Panel\n            </div>\n          </div>\n          <div class="small-12 medium-7 large-7 columns">\n            <div class="subSectionTitle">\n              Token Generation:\n            </div>\n            <form id="createUserRequest">\n              <div class="row small-collapse medium-uncollapse">\n                <div class="small-12 medium-6 large-6 columns">\n                  <div class="inputWrapper">\n                    <input id="email" type="text" name="Email" placeholder="Email">\n                    <small class="error hidden"></small>\n                  </div>\n                </div>\n                <div class="small-12 medium-6 large-6 columns">\n                  <div class="inputWrapper">\n                    <input id="confirmEmail" type="text" name="ConfirmEmail" placeholder="Confirm Email">\n                    <small class="error hidden"></small>\n                  </div>\n                </div>\n              </div>\n              <div class="row small-collapse medium-uncollapse">\n                <div class="small-12 small-centered columns">\n                  <button id="submitCreateUserButton" class="button round expand" type="button">Send Token</button>\n                </div>\n              </div>\n              <div class="row small-collapse medium-uncollapse">\n                <div class="small-12 columns">\n                  <div class="hidden" id="serverError">\n                  </div>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n        <div class="subSectionTitle users">\n            Verified users:\n        </div>\n        <div id="verifiedUsers-view">\n        </div>\n        <div class="subSectionTitle users">\n          Unverified users:\n        </div>\n        <div id="unverifiedUsers-view">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div id="deleteModal" class="reveal-modal small" data-reveal data-options="close_on_background_click:false">\n  <div class="row">\n    <div class="small-8 small-centered columns">\n      <p>Are you sure?</p>\n    </div>\n    <div class="small-6 columns">\n        <button id="deleteNo" class="button expand" type="button">No</button>\n    </div>\n    <div class="small-6 columns">\n        <button id="deleteYes" class="button expand" type="button">Yes</button>\n    </div>\n  </div>\n</div>\n<div id="signupEmailModal" class="reveal-modal small" data-reveal>\n  <h4>Successful token creation!</h4>\n  A token has been generated and sent the to the supplied email address.\n  <a class="close-reveal-modal" aria-label="Close">&#215;</a>\n</div>\n<div id="resendSignupEmailModal" class="reveal-modal small" data-reveal>\n  <h4>Resent authentication token!</h4>\n  A new email with the user\'s authentication token has been sent.\n  <a class="close-reveal-modal" aria-label="Close">&#215;</a>\n</div>\n\n\n';

}
return __p
};

this["JST"]["templates/adminPersonTimeSheetWeek.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '';

}
return __p
};

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
__p += '\n  </div>\n  <div class="days clearfix" id="daysContainer">\n    <div id="weekSelector"></div>\n    ';
 _.each(days, function(day) {
      var monday = moment(day.date).isSame(moment(day.date).startOf('isoweek'));
      ;
__p += '\n      <div class="' +
((__t = ( monday ? day.classes + ' monday' : day.classes )) == null ? '' : __t) +
'" id="' +
((__t = ( moment(day.date).format('YYYY-MM-DD') )) == null ? '' : __t) +
'">\n        <span class="day-number">' +
((__t = ( day.day )) == null ? '' : __t) +
'</span>\n      </div>\n    ';
 }); ;
__p += '\n  </div>\n</div>\n<div id="changeTimeSheetModal" class="reveal-modal small" data-reveal data-options="close_on_background_click:false">\n  <div class="row">\n    <div class="small-12 small-centered columns">\n      <p>You have made changes to this timesheet and not submitted. If you change to a different timesheet your input will be lost. Are you sure you wish to proceed?</p>\n    </div>\n    <div class="small-6 columns">\n        <button id="changeTimeSheetNo" class="button expand" type="button">No</button>\n    </div>\n    <div class="small-6 columns">\n        <button id="changeTimeSheetYes" class="button expand" type="button">Yes</button>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/home.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="homeTemplate">\n  <div class="row">\n    <div class="small-12 medium-8 large-6 small-centered columns">\n      <div id="homeContent">\n        <div class="row">\n          <div class="small-12 medium-6 large-6 columns">\n            <img src="images/logoWithText.jpg"/>\n            <div id="homeTitle">\n              Timesheet Application\n            </div>\n          </div>\n          <div class="small-12 medium-6 large-6 columns buttons">\n            <button id="toLoginPageButton" class="button round expand" type="submit">Login</button>\n            <button id="toAccountCreationButton" class="button round expand" type="submit">Create Account</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

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
__p += '<a href="tel:843-277-0493" class="top-contact-info" style="padding-right: 1em;">\n    <i class="fa fa-phone"></i>\n    <span id="contactPhone">\n        843-277-0493\n    </span>\n</a>\n<a href="mailto:info@elevationhealthcare.com" class="top-contact-info"> <i class="fa fa-envelope"></i>\n    <span id="contactEmail">\n        info@elevationhealthcare.com\n    </span>\n</a>\n<div style="float: right;">\n    <a target="_blank" href="https://www.facebook.com/ElevationHealthcare" class="top-social-icon">\n        <i class="fa fa-facebook"></i>\n    </a>\n    <a target="_blank" href="https://www.linkedin.com/company/elevation-healthcare" class="top-social-icon">\n        <i class="fa fa-linkedin"></i>\n    </a>\n    <a target="_blank" href="https://plus.google.com/113418667459138730721/about?hl=en" class="top-social-icon">\n        <i class="fa fa-google-plus"></i>\n    </a>\n    <a target="_blank" href="https://twitter.com/elevathealth" class="top-social-icon">\n        <i class="fa fa-twitter"></i>\n    </a>\n</div>';

}
return __p
};

this["JST"]["templates/login.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loginTemplate">\n  <div class="row">\n    <div class="small-12 medium-10 large-10 small-centered columns">\n      <div class="row">\n        <div class="small-12 medium-6 large-6 small-centered columns">\n          <div id="loginContent">\n            <div class="row">\n              <div class="small-4 medium-3 large-4 columns">\n                <button id="homeButton" class="button round expand" type="button">\n                  <i id="homeIcon" class="fa fa-home"></i>\n                </button>\n              </div>\n              <div class="small-8 medium-9 large-8 columns">\n                <span id="loginIntroText">\n                  Already have a login? Great! Sign in below.\n                </span>\n              </div>\n            </div>\n            <form id="loginRequest">\n              <div class="inputWrapper">\n                <input id="email" type="text" name="Email" placeholder="Email">\n                <small class="error hidden"></small>\n              </div>\n              <div class="inputWrapper">\n                <input id="password" type="password" name="Password" placeholder="Password">\n                <small class="error hidden"></small>\n              </div>\n              <div class="row">\n                <div class="small-12 small-centered columns">\n                  <button id="loginButton" class="button round expand" type="button">Login</button>\n                </div>\n              </div>\n              <div class="row">\n                <div class="small-12 columns">\n                  <div class="hidden" id="serverError">\n                  </div>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/loginCreation.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loginCreationTemplate">\n  <div class="row">\n    <div class="small-12 medium-10 large-10 small-centered columns">\n      <div class="row">\n        <div class="small-12 columns">\n          <div id="loginCreationContent">\n            <div class="row">\n              <div class="small-12 medium-2 large-2 columns">\n                <button id="homeButton" class="button round expand" type="button">\n                  <i id="homeIcon" class="fa fa-home"></i>\n                </button>\n              </div>\n              <div class="small-12 medium-10 large-10 columns">\n                <span id="loginIntroText">\n                  Don\'t have login yet? No problem! Provide your authentication key and fill in the information below to get started.\n                </span>\n              </div>\n            </div>\n            <form id="loginCreation">\n              <div class="row">\n                <div class="small-12 medium-6 large-6 columns">\n                  <div class="inputWrapper">\n                    <input id="firstName" type="text" name="FirstName" placeholder="First Name" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n                <div class="small-12 medium-6 large-6 columns">\n                  <div class="inputWrapper">\n                    <input id="lastName" type="text" name="LastName" placeholder="Last Name" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n              </div>\n              <div class="row">\n                <div class="small-12 medium-6 large-6 columns">\n                  <div class="inputWrapper">\n                    <input id="email" type="text" name="Email" placeholder="Email" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n                <div class="small-12 medium-6 large-6 columns">\n                  <div class="inputWrapper">\n                    <input id="emailConfirm" type="text" name="ConfirmEmail" placeholder="Confirm Email" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n              </div>\n              <div class="row">\n                <div class="small-12 medium-6 large-6 columns">\n                  <div class="inputWrapper">\n                    <input id="password" type="password" name="Password" placeholder="Password (Must Include a digit)" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n                <div class="small-12 medium-6 large-6 columns">\n                  <div class="inputWrapper">\n                    <input id="passwordConfirmation" type="password" name="ConfirmPassword" placeholder="Confirm Password" />\n                    <small class=\'error hidden\'></small>\n                  </div>\n                </div>\n              </div>\n              <div class="inputWrapper">\n                <input id="authKey" type="text" name="AuthToken" placeholder="Authentication Key" />\n                <small class=\'error hidden\'></small>\n              </div>\n              <button id="submitButton" class="button round expand">Create</button>\n              <div class="row">\n                <div class="small-12 columns">\n                  <div class="hidden" id="serverError">\n                  </div>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/timeSelector.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="timePickersCover"></div>\n<div id="timePickerHeader">\n  <div class="row small-collapse medium-uncollapse border">\n    <div class="small-12 small-cenetered columns">\n      Week of (' +
((__t = ( moment(weekStartDate).format('MM/DD/YYYY') )) == null ? '' : __t) +
') to (' +
((__t = ( moment(weekStartDate).add(4, 'd').format('MM/DD/YYYY') )) == null ? '' : __t) +
'):\n    </div>\n  </div>\n</div>\n<div id="timePickersWrapper">\n</div>\n<div class="border" id="totalTimeWrapper">\n  <div class="row small-collapse medium-uncollapse">\n    <div class="small-9 medium-10 columns" id="totalTimeText">\n      Total Time:\n    </div>\n    <div class="small-2 columns" id="totalTime">' +
((__t = ( (totalTime !== null) ? totalTime : 0 )) == null ? '' : __t) +
'</div>\n  </div>\n</div>\n<div id="buttonsWrapper">\n  <div class="row small-collapse medium-uncollapse">\n    <div class="medium-8 small-12 columns">\n      <button id="submitTimeSheetPhoto" class="button round expand" type="submit">Upload TimeSheet Photo</button>\n    </div>\n    <div class="medium-4 small-12 columns">\n      <button id="toAccountCreationButton" class="button round expand" type="submit">Submit</button>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/timeSelectorDay.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="timeselectors-' +
((__t = ( formattedDate)) == null ? '' : __t) +
'" class="row small-collapse medium-uncollapse margin-bottom border">\n  <div class="small-12 columns">' +
((__t = ( moment(date).format('dddd') )) == null ? '' : __t) +
' (' +
((__t = ( moment(date).format('MM/DD/YYYY') )) == null ? '' : __t) +
')</div>\n  <div class="small-10 columns">\n    <div class="row small-collapse">\n      <div class="small-5 medium-2 columns morning">\n        <input id="morning-login" class="input-' +
((__t = ( formattedDate)) == null ? '' : __t) +
'" type="text" id="example" placeholder="Login"/>\n      </div>\n      <div class="small-1 medium-1 columns morning dash"> - </div>\n      <div class="small-5 medium-2 columns morning">\n        <input id="morning-logout" class="input-' +
((__t = ( formattedDate)) == null ? '' : __t) +
'" type="text" id="example" placeholder="Logout"/>\n      </div>\n      <div class="small-5 medium-2 medium-offset-1 columns afternoon">\n        <input id="afternoon-login" class="input-' +
((__t = ( formattedDate)) == null ? '' : __t) +
'" type="text" id="example" placeholder="Login"/>\n      </div>\n      <div class="small-1 medium-1 columns afternoon dash"> - </div>\n      <div class="small-5 medium-2 columns afternoon end">\n        <input id="afternoon-logout" class="input-' +
((__t = ( formattedDate)) == null ? '' : __t) +
'" type="text" id="example" placeholder="Logout"/>\n      </div>\n    </div>\n  </div>\n  <div id="totalHours-' +
((__t = ( formattedDate)) == null ? '' : __t) +
'" class="small-2 columns hours">\n    ' +
((__t = ( time )) == null ? '' : __t) +
'\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/timeSheet.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="timeSheetTemplate">\n  <div class="row">\n    <div class="small-12 small-centered columns">\n      <div id="timeSheetContent">\n        <div class="row small-collapse medium-uncollapse">\n          <div class="small-12 medium-6 medium-push-6 columns">\n            <div id="clndr-view">\n            </div>\n          </div>\n          <div class="small-12 medium-6 medium-pull-6 columns">\n            <div id="timeSelector-view">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/unverifiedUser.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="userBlock">\n  <button class="unverified user" type="button" data-id="' +
((__t = ( person.id )) == null ? '' : __t) +
'">' +
((__t = ( person.Email)) == null ? '' : __t) +
'</button>\n  <div class="personInfo">\n    <div class="row unverifiedRow">\n      <div class="small-12 medium-12 large-8 columns authTokenClass">\n        Authentication Token: ' +
((__t = ( person.id)) == null ? '' : __t) +
'\n      </div>\n      <div class="small-12 medium-12 large-4 columns">\n        <div class="buttonDiv">\n          <button class="button round resendButton" >Resend Email</button>\n          <button class="button round deleteButton" >Delete</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/verifiedUser.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="userBlock">\n  <button class="verified user" type="button" data-id="' +
((__t = ( person.id )) == null ? '' : __t) +
'">\n    ' +
((__t = ( person.FirstName)) == null ? '' : __t) +
'  ' +
((__t = (person.LastName)) == null ? '' : __t) +
'\n  </button>\n  <div class="personInfo">\n    <div class="personalInformationDiv">\n      <div class="personalTitle">\n        Personal Information:\n      </div>\n      <div class="personalInformation">\n        <div class="row">\n          <div class="small-12 medium-6 large-6 columns">\n            Email: ' +
((__t = ( person.Email)) == null ? '' : __t) +
'\n          </div>\n          <div class="small-12 medium-6 large-6 columns">\n            Role: ' +
((__t = ( person.Role)) == null ? '' : __t) +
'\n          </div>\n          <div class="small-12 columns authTokenClass">\n            Authentication Token: ' +
((__t = ( person.id)) == null ? '' : __t) +
'\n          </div>\n          <div class="small-12 columns">\n            <div class="buttonDiv">\n              <button class="button round deleteButton" >Delete</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="timeSheetInfo-view">\n      <div class="personalTitle">\n        Time Sheets:\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};