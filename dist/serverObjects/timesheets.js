var TimeSheets = function(connection){
  this.connection = connection;
};

TimeSheets.prototype.fetch = function(req, done) {
  this.connection.query("SELECT HEX(person_id), weekStartDate, mondayTime, tuesdayTime, wednesdayTime, thursdayTime, fridayTime, totalTime \
    FROM TimeSheets WHERE weekStartDate BETWEEN ? AND ?", [req.query.selectStartDate, req.query.selectEndDate], function(err, results) {
      if (err) {
        console.log(err);
        return done(err, null)
      }
      var returnArray = cleanResults(results);
      return done(null, returnArray);
    });

  //Helper Function
  function cleanResults(results) {
    var returnArray = [];
    for (var i=0 ; i<results.length ; i++) {
      var timeSheet = {};
      timeSheet.id = results[i]['HEX(person_id)'];
      timeSheet.weekStartDate = results[i].weekStartDate;
      timeSheet.mondayTime = results[i].mondayTime;
      timeSheet.tuesdayTime = results[i].tuesdayTime;
      timeSheet.wednesdayTime = results[i].wednedayTime;
      timeSheet.thursdayTime = results[i].thursdayTime;
      timeSheet.fridayTime = results[i].fridayTime;
      timeSheet.totalTime = results[i].totalTime;
      returnArray.push(timeSheet);
    }
    return returnArray;
  }
};

module.exports = TimeSheets;