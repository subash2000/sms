const schedule = require("node-schedule");
const Mill = require("../models/MillModel");

let jobs = [];

const process = () => {};

const job = () => {
  let hour = [];
  let minute = [];

  Mill.findOne({})
    .then((mill) => {
      if (mill) {
        hour.push(mill.shift1Hr);
        hour.push(mill.shift2Hr);
        hour.push(mill.shift3Hr);
        minute.push(mill.shift1Min);
        minute.push(mill.shift2Min);
        minute.push(mill.shift3Min);
        for (let i = 0; i < hour.length; i++) {
          let rule = new schedule.RecurrenceRule();
          rule.hour = hour[i];
          rule.minute = minute[i];

          jobs.push(
            schedule.scheduleJob(rule, function () {
              process();
            })
          );
        }
      }
    })
    .catch((err) => console.log(err));
};

const cancelJobs = () => {
  jobs.map((item) => {
    item.cancel();
  });
};

const restartJobs = () => {
  cancelJobs();
  job();
};

module.exports = {
  job,
  cancelJobs,
  restartJobs,
};
