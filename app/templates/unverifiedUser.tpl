<div class="userBlock">
  <button class="unverified user" type="button" data-id="<%= person.id %>"><%= person.Email%></button>
  <div class="personInfo">
    <div class="row unverifiedRow">
      <div class="small-12 medium-12 large-8 columns authTokenClass">
        Authentication Token: <%= person.id%>
      </div>
      <div class="small-12 medium-12 large-4 columns">
        <div class="buttonDiv">
          <button class="button round resendButton" >Resend Email</button>
          <button class="button round deleteButton" >Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>