this["JST"] = this["JST"] || {};

this["JST"]["templates/home.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="homeTemplate">\n  <div class="row">\n    <div class="small-8 small-centered columns">\n      <div id="homeContent">\n        <div class="row">\n          <div class="small-12 small-centered columns">\n            <img src="images/logoWithText.jpg"/>\n          </div>\n        </div>\n        <div class="row">\n          <div class="small-6 columns">\n            <button id="toLoginPageButton" class="button round expand" type="submit">Login</button>\n          </div>\n          <div class="small-6 columns">\n            <button id="toAccountCreationButton" class="button round expand" type="submit">Create Account</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/login.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loginTemplate">\n  <div class="row">\n    <div class="small-10 small-centered columns">\n      <div class="row">\n        <div class="small-6 small-centered columns">\n          <div id="loginContent">\n            <span id="loginIntroText">\n              Already have a login? Great! Sign in below.\n            </span>\n            <form id="loginRequest">\n              <div class="inputWrapper">\n                <input id="email" type="text" name="email" placeholder="Email" />\n                <small class=\'error\'>Invalid Email</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="password" type="password" name="password" placeholder="Password" />\n                <small class=\'error\'>Invalid Password</small>\n              </div>\n              <div class="row">\n                <div class="small-12 small-centered columns">\n                  <button id="loginButton" class="button round expand" type="submit">Login</button>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n        <!-- <div class="small-6 columns">\n          <div id="loginCreated">\n            <span id="loginIntroText">\n              Don\'t have login yet? No problem! Fill in the information below to get started.\n            </span>\n            <form>\n              <div class="inputWrapper">\n                <input id="name" type="text" name="name" placeholder="Name" />\n                <small class=\'error\'>Name Required</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="email" type="text" name="email" placeholder="Email" />\n                <small class=\'error\'>Email Required</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="emailConfirm" type="text" name="emailConfirm" placeholder="Confirm Email" />\n                <small class=\'error\'>Email Confirmation Required</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="password" type="password" name="password" placeholder="Password" />\n                <small class=\'error\'>Password Required</small>\n              </div>\n              <div class="inputWrapper">\n                <input id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" />\n                <small class=\'error\'>Password Confrimation Required</small>\n              </div>\n              <div class="row">\n                <div class="small-12 small-centered columns">\n                  <button id="submitButton" class="button round expand" type="submit">Create</button>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div> -->\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/timeSheet.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>Logged in</div>';

}
return __p
};