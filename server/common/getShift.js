const Mill = require("../models/MillModel");

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

module.exports = {
  shift: getShift,
};
