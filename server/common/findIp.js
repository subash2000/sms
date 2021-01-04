const dns = require("dns");
const os = require("os");

const getIp = (id, cb) => {
  dns.lookup(os.hostname(), function (err, add, fam) {
    if (err) cb(err, null);
    else {
      let network = add.substr(0, add.lastIndexOf(".") + 1) + id;
      cb(null, network);
    }
  });
};

module.exports = {
  getIp,
};
