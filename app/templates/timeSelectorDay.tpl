<div class="row small-collapse medium-uncollapse margin-bottom border">
  <div class="small-12 columns"><%= moment(date).format('dddd') %> (<%= moment(date).format('MM/DD/YYYY') %>)</div>
  <div class="small-10 columns">
    <div class="row small-collapse">
      <div class="small-5 medium-2 columns morning">
        <input class="timer-input" type="text" id="example" placeholder="Login"/>
      </div>
      <div class="small-1 medium-1 columns morning dash"> - </div>
      <div class="small-5 medium-2 columns morning">
        <input class="timer-input" type="text" id="example" placeholder="Logout"/>
      </div>
      <div class="small-5 medium-2 medium-offset-1 columns afternoon">
        <input class="timer-input" type="text" id="example" placeholder="Login"/>
      </div>
      <div class="small-1 medium-1 columns afternoon dash"> - </div>
      <div class="small-5 medium-2 columns afternoon end">
        <input class="timer-input" type="text" id="example" placeholder="Logout"/>
      </div>
    </div>
  </div>
  <div class="small-2 columns hours">
    <%= time %>
  </div>
</div>