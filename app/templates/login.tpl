<div id="loginTemplate">
  <div class="row">
    <div class="small-10 small-centered columns">
      <div class="row" data-equalizer>
        <div class="small-6 columns">
          <div id="loginCreation" data-equalizer-watch>
            <span id="loginIntroText">
              Already have a login? Great! Sign in below.
            </span>
            <form id="loginRequest">
              <input id="email" type="text" name="email" placeholder="Email" />
              <small class='error'>Invalid Email</small>
              <input id="password" type="text" name="password" placeholder="Password" />
              <small class='error'>Invalid Password</small>
              <div class="row">
                <div class="small-12 small-centered columns">
                  <button id="submitButton" class="button round expand" type="submit">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="small-6 columns">
          <div id="loginCreated" data-equalizer-watch>
            <span id="loginIntroText">
              Don't have login yet? No problem! Fill in the information below to get started.
            </span>
            <form>
              <input id="name" type="text" name="name" placeholder="Name" />
              <small class='error'>Name Required</small>
              <input id="email" type="text" name="email" placeholder="Email" />
              <small class='error'>Email Required</small>
              <input id="emailConfirm" type="text" name="emailConfirm" placeholder="Confirm Email" />
              <small class='error'>Email Confirmation Required</small>
              <input id="password" type="text" name="password" placeholder="Password" />
              <small class='error'>Password Required</small>
              <input id="passwordConfirmation" type="text" name="passwordConfirmation" placeholder="Confirm Password" />
              <small class='error'>Password Confrimation Required</small>
              <div class="row">
                <div class="small-12 small-centered columns">
                  <button id="submitButton" class="button round expand" type="submit">Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>