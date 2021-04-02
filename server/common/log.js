const fs = require("fs");

var weekday = [];
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const writeLog = (data, ip) => {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  let write = `[${h}:${m}:${s}]\t\t${data}\n`;
  let path = `../log/${weekday[new Date().getDay()]}/${ip}.txt`;
  fs.appendFileSync(path, write, (err) => {
    if (err) console.log(err);
  });
};

module.exports = {
  log: writeLog,
};
