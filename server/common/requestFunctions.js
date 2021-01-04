const { full_packet } = require("./functions");
const Mill = require("../models/MillModel");
const Machine = require("../models/MachinesModel");

const pad = (num, size) => {
  if (num == null || num == undefined) {
    num = 0;
  }
  num = parseInt(num).toString(16);
  var s = "00000000" + num;
  return s.substr(s.length - size);
};

const calcHr = (hr, millhr) => {
  if (hr === parseInt(millhr)) return 0;
  else if (millhr < hr) return hr - millhr;
  else return 24 - (millhr - hr);
};
const calcMin = (min, millMin) => {
  if (min === parseInt(millMin)) return 0;
  else if (millMin < min) return min - millMin;
  else return 60 - (millMin - min);
};

//data request protocol for the specified id of the module
const dataRequestProtocol = (id) => {
  return full_packet("c33c" + pad(id.toString(16), 2) + "23000004");
};

const settingsPacket = (ip, cb) => {
  try {
    let milldetails = [];
    Mill.findOne({})
      .then((result) => {
        milldetails.push(result);
        Machine.findOne({
          ip,
        })
          .then((obj) => {
            milldetails.push(obj);
            let date = new Date();

            let packet =
              "c33c" +
              pad(obj.id, 2) +
              "2200" +
              pad("28", 2) +
              pad(date.getDate(), 2) +
              pad(date.getMonth() + 1, 2) +
              pad(date.getFullYear().toString().substr(-2), 2) +
              pad(calcHr(date.getHours(), milldetails[0].shift1Hr), 2) +
              pad(calcMin(date.getMinutes(), milldetails[0].shift1Min), 2) +
              pad(date.getSeconds(), 2) +
              pad(milldetails[0].shift1Hr, 2) +
              pad(milldetails[0].shift1Min, 2) +
              pad(milldetails[0].shift2Hr, 2) +
              pad(milldetails[0].shift2Min, 2) +
              pad(milldetails[0].shift3Hr, 2) +
              pad(milldetails[0].shift3Min, 2) +
              pad(milldetails[1].spindles, 4) +
              pad(milldetails[1].deliveryRollerDia, 2) +
              pad(milldetails[1].middleRollerDia, 2) +
              pad(milldetails[1].backRollerDia, 2) +
              pad(milldetails[1].deliveryRollerPpr, 2) +
              pad(milldetails[1].middleRollerPpr, 2) +
              pad(milldetails[1].backRollerPpr, 2) +
              pad(milldetails[1].tinRollerPpr, 2) +
              pad(milldetails[1].deliveryRollerRpm, 2) +
              pad(milldetails[1].middleRollerRpm, 2) +
              pad(milldetails[1].backRollerRpm, 2) +
              pad(milldetails[1].tinRollerRpm, 2) +
              "00" +
              pad(milldetails[1].count.value, 4) +
              "04";
            cb(full_packet(packet), null);
          })
          .catch((error) => {
            cb(null, {
              msg: error,
            });
          });
      })
      .catch((err) => {
        cb(null, {
          msg: err,
        });
      });
  } catch (err) {
    cb(null, {
      msg: err,
    });
  }
};

module.exports = { dataRequestProtocol, settingsPacket };
