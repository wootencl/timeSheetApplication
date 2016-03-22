<div id="adminTemplate">
  <div class="row">
    <div class="small-12 medium-10 small-centered columns">
      <div id="adminContent">
        <div class="row">
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
              <div class="row">
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
              <div class="row">
                <div class="small-12 small-centered columns">
                  <button id="submitCreateUserButton" class="button round expand" type="button">Send Token</button>
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
        <div class="subSectionTitle users">
            Verified users:
        </div>
        <div class="userBlock">
          <button id="verified-user-1" class="verified user" type="button">Carter Wooten</button>
          <!-- <div class="small-11 small-centered columns">This is a test</div> -->
        </div>

        <button id="verified-user-2" class="verified user" type="button">John Smith</button>
        <button id="verified-user-3" class="verified user" type="button">Bob Hope</button>
        <button id="verified-user-4" class="verified user" type="button">Abraham Lincoln</button>
        <div class="subSectionTitle users">
          Unverified users:
        </div>
        <button id="unverified-user-1" class="unverified user" type="button">gwashington@gmail.com</button>
        <button id="unverified-user-2" class="unverified user" type="button">atrainor@gmai.com</button>
      </div>
    </div>
  </div>
</div>