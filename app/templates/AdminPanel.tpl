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
        <%
          for (var i=0 ; i<persons.length ; i++) {
            var person = persons[i];
            if (person.FirstName === null) continue;
        %>
          <div class="userBlock">
            <button class="verified user" type="button" data-id="<%= person.id %>"><%= person.FirstName%>  <%=person.LastName%></button>
            <div class="personInfo">
              <div class="personalInformationDiv">
                <div class="personalInformationTitle">
                  Personal Information:
                </div>
                <div class="personalInformation">
                  <div class="row">
                    <div class="small-12 medium-6 large-6 columns">
                      Email: <%= person.Email%>
                    </div>
                    <div class="small-12 medium-6 large-6 columns">
                      Role: <%= person.Role%>
                    </div>
                    <div class="small-12 columns">
                      Authentication Token: <%= person.id%>
                    </div>
                    <div class="small-12 columns">
                      <button class="deleteButton" class="button round" >Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="timeSheetInfo-view">
                Will render person's timesheet information here.
              </div>
            </div>
          </div>
        <% } %>
        <div class="subSectionTitle users">
          Unverified users:
        </div>
        <%
          for (var i=0 ; i<persons.length ; i++) {
            var person = persons[i];
            if (person.FirstName !== null) continue;
        %>
          <div class="userBlock">
            <button class="unverified user" type="button" data-id="<%= person.id %>"><%= person.Email%></button>
            <div class="personInfo">
              <div class="row unverifiedRow">
                <div class="medium-9 columns">
                  Authentication Token: <%= person.id%>
                </div>
                <div class="medium-3 columns">
                  <button class="deleteButton" class="button round" >Delete</button>
                </div>
              </div>
            </div>
          </div>
        <% } %>
      </div>
    </div>
  </div>
</div>