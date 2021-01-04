//modules
const crc16 = require("node-crc16");

//crc calculation
const calc_crc = (packet) => {
  return crc16.checkSum(packet);
};

//packet + crc
const full_packet = (packet) => {
  return packet + calc_crc(packet);
};

//check existing crc matches with the recieved packet's calculated crc
const check_recieved_crc = (packet) => {
  return extract_crc(packet) === calc_crc(remove_crc(packet));
};

//extract crc from the whole packet
const extract_crc = (packet) => {
  return packet.substr(packet.length - 4);
};

//remove crc and return the packet
const remove_crc = (packet) => {
  return packet.substr(0, packet.length - 4);
};

const pad = (num, size) => {
  var s = "00000000" + num;
  return s.substr(s.length - size);
};

module.exports = {
  calc_crc,
  full_packet,
  check_recieved_crc,
  extract_crc,
  remove_crc,
  pad,
};
