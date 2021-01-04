const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchemea = new Schema({
  ip: String,
  date: String,
  shift: Number,
  data: Array,
});

const Log = mongoose.model("log", logSchemea);

module.exports = Log;
