<div id="adminTemplate">
  <div class="row">
    <div class="small-12 medium-10 small-centered columns">
      <div id="adminContent">
        <div id="adminPanelTitle">
          Elevation Healthcare Adminstration Panel:
        </div>
        <div class="subSectionTitle">
          Token Generation:
        </div>
        <div class="directions">
          To generate an authentication token and send it to a user please fill out their email below.
        </div>
        <form id="createUserRequest">
          <div class="row">
            <div class="small-6 columns">
              <div class="inputWrapper">
                <input id="email" type="text" name="Email" placeholder="Email">
                <small class="error hidden"></small>
              </div>
            </div>
            <div class="small-6 columns">
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
  </div>
</div>