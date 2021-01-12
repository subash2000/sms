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

const modules = {
  getCurrShift,
};

export default modules;
