var moment = require('moment');
var Promise = require("bluebird");

var getSqlConnection = require('../serverConfig/databaseConnection');

var TimeSheets = function(){
};

TimeSheets.prototype.fetch = function(req, done) {
  var wideSelectStartDate = moment(req.query.selectStartDate).subtract(1, 'M').format('YYYY-MM-DD');
  var wideSelectEndDate = moment(req.query.selectEndDate).add(1, 'M').format('YYYY-MM-DD');
  Promise.using(getSqlConnection(), function(connection) {
    return connection.query("SELECT HEX(person_id), weekStartDate, mondayTime, tuesdayTime, wednesdayTime, thursdayTime, fridayTime, totalTime \
    FROM TimeSheets WHERE (weekStartDate BETWEEN ? AND ?) AND HEX(person_id) = ?", [wideSelectStartDate, wideSelectEndDate, req.user['HEX(ID)']]).then(function(rows) {
      var cleanedResults = cleanResults(rows);
      return done(null, cleanedResults);
    }).catch(function(error) {
      return done(err, null);
    });
  });

  //Helper Function
  function cleanResults(results) {
    var returnArray = [];
    var next = false;
    var prev = false;
    var timeSelectorDateFound = false;

    for (var i=0 ; i<results.length ; i++) {
      if (moment(results[i].weekStartDate).isBefore(req.query.selectStartDate)) {
        prev = true;
        continue;
      } else if (moment(results[i].weekStartDate).isAfter(req.query.selectEndDate)) {
        next = true;
        continue;
      }

      var timeSheet = {};
      timeSheet.id = results[i]['HEX(person_id)'];
      timeSheet.weekStartDate = results[i].weekStartDate;
      timeSheet.mondayTime = results[i].mondayTime;
      timeSheet.tuesdayTime = results[i].tuesdayTime;
      timeSheet.wednesdayTime = results[i].wednesdayTime;
      timeSheet.thursdayTime = results[i].thursdayTime;
      timeSheet.fridayTime = results[i].fridayTime;
      timeSheet.totalTime = results[i].totalTime;
      returnArray.push(timeSheet);
    }
    return { resultsArray: returnArray, prev: prev, next: next };
  }
};

module.exports = TimeSheets;