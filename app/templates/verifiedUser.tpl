<div class="userBlock">
  <button class="verified user" type="button" data-id="<%= person.id %>">
    <%= person.FirstName%>  <%=person.LastName%>
  </button>
  <div class="personInfo">
    <div class="personalInformationDiv">
      <div class="personalTitle">
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
          <div class="small-12 columns authTokenClass">
            Authentication Token: <%= person.id%>
          </div>
          <div class="small-12 columns">
            <div class="buttonDiv">
              <button class="button round deleteButton" >Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="timeSheetInfo-view">
      <div class="personalTitle">
        Time Sheets:
      </div>
    </div>
  </div>
</div>