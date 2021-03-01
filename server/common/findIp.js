const dns = require("dns");
const os = require("os");
const { join } = require("path");
const { ip } = require("./keys");

const getIp = (id, cb) => {
  cb(null, ip + id);
};

const getIps = (req, cb) => {
  let ips = [];
  let from = parseInt(req.fromId);
  let to = parseInt(req.toId);
  let department = req.department;
  let machineFrom = parseInt(req.from);
  for (let i = from, k = machineFrom; i <= to; i++, k++) {
    ips.push({
      ip: ip + i,
      id: i,
      machine: k,
      department,
    });
    if (i === to) cb(null, ips);
  }
};

module.exports = {
  getIp,
  getIps,
};
