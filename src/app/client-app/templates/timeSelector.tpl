<div id="timePickersCover"></div>
<div id="timePickerHeader">
  <div class="row small-collapse medium-uncollapse border">
    <div class="small-12 small-cenetered columns">
      Week of (<%= moment(weekStartDate).format('MM/DD/YYYY') %>) to (<%= moment(weekStartDate).add(4, 'd').format('MM/DD/YYYY') %>):
    </div>
  </div>
</div>
<div id="timePickersWrapper">
</div>
<div class="border" id="totalTimeWrapper">
  <div class="row small-collapse medium-uncollapse">
    <div class="small-9 medium-10 columns" id="totalTimeText">
      Total Time:
    </div>
    <div class="small-2 columns" id="totalTime"><%= (totalTime !== null) ? totalTime : 0 %></div>
  </div>
</div>
<div id="buttonsWrapper">
  <div class="row small-collapse medium-uncollapse">
    <div class="medium-8 small-12 columns">
      <button id="submitTimeSheetPhoto" class="button round expand" type="submit">Upload TimeSheet Photo</button>
    </div>
    <div class="medium-4 small-12 columns">
      <button id="toAccountCreationButton" class="button round expand" type="submit">Submit</button>
    </div>
  </div>
</div>