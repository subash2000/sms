const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const machineSchema = new Schema(
  {
    machine: Number,
    id: Number,
    ip: {
      type: String,
    },
    backRollerDia: Number,
    backRollerRpm: Number,
    backRollerPpr: Number,
    tinRollerRpm: Number,
    tinRollerPpr: Number,
    middleRollerDia: Number,
    middleRollerPpr: Number,
    middleRollerRpm: Number,
    deliveryRollerDia: Number,
    deliveryRollerRpm: Number,
    deliveryRollerPpr: Number,
    shed: String,
    spindles: Number,
    department: String,
    model: String,
    count: {
      value: Number,
      unit: String,
    },
    data: Array,
    recieved: String,
    shift: Number,
  },
  { strict: true }
);

const Machine = mongoose.model("machines", machineSchema);

module.exports = Machine;
