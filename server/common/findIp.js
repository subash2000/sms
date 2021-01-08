const dns = require("dns");
const os = require("os");

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

const getIps = (from, to, cb) => {
  let ips = [];
  for (let i = from; i <= to; i++) {
    dns.lookup(os.hostname(), function (err, add, fam) {
      if (err) cb(err, null);
      else {
        if (fam === 4) {
          if (i === 1) {
            let address = add.substr(0, add.lastIndexOf(".") + 1) + 253;
            ips.push(address);
          } else {
            let address = add.substr(0, add.lastIndexOf(".") + 1) + i;
            ips.push(address);
          }
        } else {
          console.log("ipv6 address in getips function");
          if (id === 1) {
            let address = add.substr(7, add.lastIndexOf(".") + 1) + 253;
            ips.push(address);
          } else {
            let address = add.substr(7, add.lastIndexOf(".") + 1) + i;
            ips.push(address);
          }
        }
        if (i === to) cb(null, ips);
      }
    });
  }
};

module.exports = {
  getIp,
  getIps,
};
