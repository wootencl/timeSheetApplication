<div id="loginCreationTemplate">
  <div class="row">
    <div class="small-12 medium-10 large-10 small-centered columns">
      <div class="row">
        <div class="small-12 columns">
          <div id="loginCreationContent">
            <div class="row">
              <div class="small-2 columns">
                <button id="homeButton" class="button round expand" type="button">
                  <i id="homeIcon" class="fa fa-home"></i>
                </button>
              </div>
              <div class="small-10 columns">
                <span id="loginIntroText">
                  Don't have login yet? No problem! Provide your authentication key and fill in the information below to get started.
                </span>
              </div>
            </div>
            <form id="loginCreation">
              <div class="row">
                <div class="small-6 columns">
                  <div class="inputWrapper">
                    <input id="firstName" type="text" name="FirstName" placeholder="First Name" />
                    <small class='error hidden'></small>
                  </div>
                </div>
                <div class="small-6 columns">
                  <div class="inputWrapper">
                    <input id="lastName" type="text" name="LastName" placeholder="Last Name" />
                    <small class='error hidden'></small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="small-6 columns">
                  <div class="inputWrapper">
                    <input id="email" type="text" name="Email" placeholder="Email" />
                    <small class='error hidden'></small>
                  </div>
                </div>
                <div class="small-6 columns">
                  <div class="inputWrapper">
                    <input id="emailConfirm" type="text" name="ConfirmEmail" placeholder="Confirm Email" />
                    <small class='error hidden'></small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="small-6 columns">
                  <div class="inputWrapper">
                    <input id="password" type="password" name="Password" placeholder="Password (Must Include a digit)" />
                    <small class='error hidden'></small>
                  </div>
                </div>
                <div class="small-6 columns">
                  <div class="inputWrapper">
                    <input id="passwordConfirmation" type="password" name="ConfirmPassword" placeholder="Confirm Password" />
                    <small class='error hidden'></small>
                  </div>
                </div>
              </div>
              <div class="inputWrapper">
                <input id="authKey" type="text" name="AuthToken" placeholder="Authentication Key" />
                <small class='error hidden'></small>
              </div>
              <button id="submitButton" class="button round expand">Create</button>
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