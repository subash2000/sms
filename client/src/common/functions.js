import axios from "axios";

const getTypes = (cb) => {
  axios
    .get(process.env.REACT_APP_BACKEND + "/api/machines/types")
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
    });
};
const getMachines = (cb) => {
  axios
    .get(process.env.REACT_APP_BACKEND + "/api/machines/all")
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
    });
};

const getNames = (cb) => {
  axios
    .get(process.env.REACT_APP_BACKEND + "/api/machines/names")
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
    });
};
const getSheds = (cb) => {
  axios
    .get(process.env.REACT_APP_BACKEND + "/api/machines/sheds")
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
    });
};

const overAll = (cb) => {
  getMachines((err, payload) => {
    if (!err) {
      let machinesArr = payload.machines.filter((machine) =>
        machine.data ? true : false
      );

      let kg = machinesArr
        .map((machine) => {
          let data = JSON.parse(machine.data).data;
          let result = data[24];

          return result;
        })
        .reduce((tot, num) => {
          return tot + num;
        }, 0);
      let doff = machinesArr
        .map((machine) => {
          let data = JSON.parse(machine.data).data;
          let result = data[42];
          return result;
        })
        .reduce((tot, num) => {
          return tot + num;
        }, 0);
      let actEff = machinesArr
        .map((machine) => {
          let data = JSON.parse(machine.data).data;
          let result = data[34] + data[35] + data[36] + data[37];
          return result;
        })
        .reduce((tot, num) => {
          return tot + num;
        }, 0);

      cb(false, { kg, doff, actEff });
    } else {
      cb(true, null);
    }
  });
};
const modules = {
  getTypes,
  getMachines,
  getNames,
  getSheds,
  overAll,
};

export default modules;
