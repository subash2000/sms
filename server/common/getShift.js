const Mill = require("../models/MillModel");

const settingsDate = (shift1Hr, shift1Min) => {
  let date = new Date();
  if (
    date.getHours() < shift1Hr ||
    (date.getHours() == shift1Hr && date.getMinutes() <= shift1Min)
  ) {
    date.setDate(date.getDate() - 1);
  }
  return date.getDate();
};

const getShift = (cb) => {
  Mill.findOne({}).then((mill) => {
    if (!mill) {
      cb(null, 0);
    } else {
      let date = new Date();
      let hr = date.getHours();
      let min = date.getMinutes();
      if (
        (mill.shift1Hr == hr && mill.shift1Min <= min) ||
        (mill.shift1Hr < hr &&
          (mill.shift2Hr > hr || (mill.shift2Hr == hr && mill.shift2Min > min)))
      ) {
        cb(null, 1);
      } else if (
        (mill.shift2Hr == hr && mill.shift2Min <= min) ||
        (mill.shift2Hr < hr &&
          (mill.shift3Hr > hr || (mill.shift3Hr == hr && mill.shift3Min > min)))
      ) {
        cb(null, 2);
      } else {
        cb(null, 3);
      }
    }
  });
};

const getShiftWithDate = (cb) => {
  Mill.findOne({}).then((mill) => {
    if (!mill) {
      cb({ msg: "NO mill details" }, {});
    } else {
      let shiftDate = new Date();
      shiftDate.setDate(settingsDate(mill.shift1Hr, mill.shift1Min));
      let date = new Date();
      let hr = date.getHours();
      let min = date.getMinutes();
      if (
        (mill.shift1Hr == hr && mill.shift1Min <= min) ||
        (mill.shift1Hr < hr &&
          (mill.shift2Hr > hr || (mill.shift2Hr == hr && mill.shift2Min > min)))
      ) {
        cb(null, { shift: 1, date: shiftDate });
      } else if (
        (mill.shift2Hr == hr && mill.shift2Min <= min) ||
        (mill.shift2Hr < hr &&
          (mill.shift3Hr > hr || (mill.shift3Hr == hr && mill.shift3Min > min)))
      ) {
        cb(null, { shift: 2, date: shiftDate });
      } else {
        cb(null, { shift: 3, date: shiftDate });
      }
    }
  });
};

module.exports = {
  shift: getShift,
  getShiftWithDate,
};
