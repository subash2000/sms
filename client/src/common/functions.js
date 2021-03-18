import axios from "axios";

const getCurrShift = (cb) => {
  axios
    .get(process.env.REACT_APP_BACKEND + "/api/live/currshift")
    .then((res) => {
      cb(null, res.data.shift.toString());
    })
    .catch((err) => {
      cb(err, null);
    });
};

const parameters = [
  "Model",
  "Count",
  "Kg",
  "m/min",
  "tpi",
  "spindle rpm",
  "AEF %",
  "PEF %",
  "Stops",
  "Stop min",
  "Doffs",
  "Doff min",
  "Power Failure",
  "Power Failure min",
  "Ukg",
];

const modules = {
  getCurrShift,
  parameters,
};

export default modules;
