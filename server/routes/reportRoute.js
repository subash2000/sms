var express = require("express");
var router = express.Router();
const Log = require("../models/LogModel");
const Machines = require("../models/MachinesModel");

router.post("/", (req, res) => {
  Log.find({
    shift: req.body.shift,
    date: req.body.date,
  })
    .then((resArr) => {
      if (resArr && resArr.length) {
        let ipData = {};
        let ipArr = resArr.map((item) => {
          ipData[item.ip] = item.data;
          return item.ip;
        });
        Machines.find({
          ip: { $in: [...ipArr] },
        })
          .then((machinesArr) => {
            if (!machinesArr || !machinesArr.length)
              res.status(400).send({
                msg: "No data found",
              });
            else {
              let machines = machinesArr.map((item) => {
                return { ...item._doc, data: ipData[item._doc.ip] };
              });
              Promise.all([machines]).then(() => {
                res.send({
                  machines,
                });
              });
            }
          })
          .catch((error) => {
            res.status(400).send({ error });
          });
      } else {
        res.status(400).send({
          msg: "No data found",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        msg: "error",
        err,
      });
    });
});

module.exports = router;
