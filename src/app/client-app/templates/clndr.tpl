<div class="clndr-controls">
  <div class="clndr-previous-button">&lsaquo;</div><!--
   --><div class="month"><%= month %></div><!--
   --><div class="clndr-next-button">&rsaquo;</div>
</div>
<div class="clndr-grid">
  <div class="days-of-the-week clearfix">
    <% _.each(daysOfTheWeek, function(day) { %>
      <div class="header-day"><%= day %></div>
    <% }); %>
  </div>
  <div class="days clearfix" id="daysContainer">
    <div id="weekSelector"></div>
    <% _.each(days, function(day) {
      var monday = moment(day.date).isSame(moment(day.date).startOf('isoweek'));
      %>
      <div class="<%= monday ? day.classes + ' monday' : day.classes %>" id="<%= moment(day.date).format('YYYY-MM-DD') %>">
        <span class="day-number"><%= day.day %></span>
      </div>
    <% }); %>
  </div>
</div>
<div id="changeTimeSheetModal" class="reveal-modal small" data-reveal data-options="close_on_background_click:false">
  <div class="row">
    <div class="small-12 small-centered columns">
      <p>You have made changes to this timesheet and not submitted. If you change to a different timesheet your input will be lost. Are you sure you wish to proceed?</p>
    </div>
    <div class="small-6 columns">
        <button id="changeTimeSheetNo" class="button expand" type="button">No</button>
    </div>
    <div class="small-6 columns">
        <button id="changeTimeSheetYes" class="button expand" type="button">Yes</button>
    </div>
  </div>
</div>