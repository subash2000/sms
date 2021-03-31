const fs = require("fs");

var weekday = [];
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const writeLog = (data) => {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  let write = "[" + h + ":" + m + ":" + s + "]\t\t" + data;
  fs.appendFileSync(
    "../log/" + weekday[new Date().getDay()] + ".txt",
    write,
    (err) => {
      if (err) console.log(err);
    }
  );
};

module.exports = {
  log: writeLog,
};
