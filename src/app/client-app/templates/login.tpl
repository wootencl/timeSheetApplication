<div id="loginTemplate">
  <div class="row">
    <div class="small-12 medium-10 large-10 small-centered columns">
      <div class="row">
        <div class="small-12 medium-6 large-6 small-centered columns">
          <div id="loginContent">
            <div class="row">
              <div class="small-4 medium-3 large-4 columns">
                <button id="homeButton" class="button round expand" type="button">
                  <i id="homeIcon" class="fa fa-home"></i>
                </button>
              </div>
              <div class="small-8 medium-9 large-8 columns">
                <span id="loginIntroText">
                  Already have a login? Great! Sign in below.
                </span>
              </div>
            </div>
            <form id="loginRequest">
              <div class="inputWrapper">
                <input id="email" type="text" name="Email" placeholder="Email">
                <small class="error hidden"></small>
              </div>
              <div class="inputWrapper">
                <input id="password" type="password" name="Password" placeholder="Password">
                <small class="error hidden"></small>
              </div>
              <div class="row">
                <div class="small-12 small-centered columns">
                  <button id="loginButton" class="button round expand" type="button">Login</button>
                </div>
              </div>
              <div class="row">
                <div class="small-12 columns">
                  <div class="hidden" id="serverError">
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>