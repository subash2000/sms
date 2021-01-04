const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const millSchema = new Schema({
  customer: String,
  address: String,
  email: String,
  shifts: Number,
  shift1Hr: Number,
  shift1Min: Number,
  shift2Hr: Number,
  shift2Min: Number,
  shift3Hr: Number,
  shift3Min: Number,
  counts: {
    type: [
      {
        value: Number,
        unit: String,
      },
    ],
  },
  departments: Array,
  models: Array,
});

const Mill = mongoose.model("milldetails", millSchema);

module.exports = Mill;
