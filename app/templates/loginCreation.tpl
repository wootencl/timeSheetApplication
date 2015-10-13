<div id="loginCreationTemplate">
  <div class="row">
    <div class="small-12 medium-10 large-10 small-centered columns">
      <div class="row">
        <div class="small-11 medium-6 large-6 small-centered columns">
          <div id="loginCreationContent">
            <span id="loginIntroText">
              Don't have login yet? No problem! Provide your authentication key and fill in the information below to get started.
            </span>
            <form>
              <div class="inputWrapper">
                <input id="authKey" type="text" name="authKey" placeholder="Authentication Key" />
                <small class='error'>Authentication Key Required</small>
              </div>
              <div class="inputWrapper">
                <input id="name" type="text" name="name" placeholder="Name" />
                <small class='error'>Name Required</small>
              </div>
              <div class="inputWrapper">
                <input id="email" type="text" name="email" placeholder="Email" />
                <small class='error'>Email Required</small>
              </div>
              <div class="inputWrapper">
                <input id="emailConfirm" type="text" name="emailConfirm" placeholder="Confirm Email" />
                <small class='error'>Email Confirmation Required</small>
              </div>
              <div class="inputWrapper">
                <input id="password" type="password" name="password" placeholder="Password" />
                <small class='error'>Password Required</small>
              </div>
              <div class="inputWrapper">
                <input id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" />
                <small class='error'>Password Confrimation Required</small>
              </div>
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