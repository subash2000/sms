const dns = require("dns");
const os = require("os");
const { join } = require("path");

const getIp = (id, cb) => {
  dns.lookup(os.hostname(), function (err, add, fam) {
    if (err) cb(err, null);
    else {
      if (fam === 4) {
        if (id === "1") {
          let address = add.substr(0, add.lastIndexOf(".") + 1) + 253;
          cb(null, address);
        } else {
          let address = add.substr(0, add.lastIndexOf(".") + 1) + id;
          cb(null, address);
        }
      } else {
        console.log("ipv6 address in getip function");
        if (id === "1") {
          let address = add.substr(7, add.lastIndexOf(".") + 1) + 253;
          cb(null, address);
        } else {
          let address = add.substr(7, add.lastIndexOf(".") + 1) + id;
          cb(null, address);
        }
      }
    }
  });
};

const getIps = (req, cb) => {
  let ips = [];
  let from = parseInt(req.fromId);
  let to = parseInt(req.toId);
  let department = req.department;
  let machineFrom = parseInt(req.from);
  for (let i = from, k = machineFrom; i <= to; i++, k++) {
    dns.lookup(os.hostname(), function (err, add, fam) {
      if (err) cb(err, null);
      else {
        let address = "";
        if (fam === 4) {
          if (i === 1) {
            address = add.substr(0, add.lastIndexOf(".") + 1) + 253;
          } else {
            address = add.substr(0, add.lastIndexOf(".") + 1) + i;
          }
        } else {
          console.log("ipv6 address in getips function");
          if (id === 1) {
            address = add.substr(7, add.lastIndexOf(".") + 1) + 253;
          } else {
            address = add.substr(7, add.lastIndexOf(".") + 1) + i;
          }
        }
        ips.push({
          ip: address,
          id: i,
          machine: k,
          department,
        });
        if (i === to) cb(null, ips);
      }
    });
  }
};

module.exports = {
  getIp,
  getIps,
};
