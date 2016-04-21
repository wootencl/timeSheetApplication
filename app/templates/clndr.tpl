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