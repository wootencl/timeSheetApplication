<div id="adminTemplate">
  <div class="row small-collapse medium-uncollapse">
    <div class="small-12 medium-10 small-centered columns">
      <div id="adminContent">
        <div class="row small-collapse medium-uncollapse">
          <div class="small-12 medium-5 large-5 columns">
            <img src="images/logoWithText.jpg"/>
            <div id="adminPanelTitle">
              Adminstration Panel
            </div>
          </div>
          <div class="small-12 medium-7 large-7 columns">
            <div class="subSectionTitle">
              Token Generation:
            </div>
            <form id="createUserRequest">
              <div class="row small-collapse medium-uncollapse">
                <div class="small-12 medium-6 large-6 columns">
                  <div class="inputWrapper">
                    <input id="email" type="text" name="Email" placeholder="Email">
                    <small class="error hidden"></small>
                  </div>
                </div>
                <div class="small-12 medium-6 large-6 columns">
                  <div class="inputWrapper">
                    <input id="confirmEmail" type="text" name="ConfirmEmail" placeholder="Confirm Email">
                    <small class="error hidden"></small>
                  </div>
                </div>
              </div>
              <div class="row small-collapse medium-uncollapse">
                <div class="small-12 small-centered columns">
                  <button id="submitCreateUserButton" class="button round expand" type="button">Send Token</button>
                </div>
              </div>
              <div class="row small-collapse medium-uncollapse">
                <div class="small-12 columns">
                  <div class="hidden" id="serverError">
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="subSectionTitle users">
            Verified users:
        </div>
        <div id="verifiedUsers-view">
        </div>
        <div class="subSectionTitle users">
          Unverified users:
        </div>
        <div id="unverifiedUsers-view">
        </div>
      </div>
    </div>
  </div>
</div>
<div id="deleteModal" class="reveal-modal small" data-reveal data-options="close_on_background_click:false">
  <div class="row">
    <div class="small-8 small-centered columns">
      <p>Are you sure?</p>
    </div>
    <div class="small-6 columns">
        <button id="deleteNo" class="button expand" type="button">No</button>
    </div>
    <div class="small-6 columns">
        <button id="deleteYes" class="button expand" type="button">Yes</button>
    </div>
  </div>
</div>
<div id="signupEmailModal" class="reveal-modal small" data-reveal>
  <h4>Successful token creation!</h4>
  A token has been generated and sent the to the supplied email address.
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>
<div id="resendSignupEmailModal" class="reveal-modal small" data-reveal>
  <h4>Resent authentication token!</h4>
  A new email with the user's authentication token has been sent.
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>


