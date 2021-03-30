var express = require("express");
var router = express.Router();
let currVal = require("../common/currVal");
const Mill = require("../models/MillModel");
const Machine = require("../models/MachinesModel");

router.get("/", (req, res) => {
  Mill.findOne({})
    .then((result) => {
      if (!result) {
        res.status(400).send({
          msg: "mill",
        });
      } else {
        Machine.find({})
          .then((doc) => {
            if (!doc || !doc.length) {
              res.status(400).send({
                msg: "machine",
              });
            } else {
              res.send({ ...currVal, machinesArr: doc });
            }
          })
          .catch((err) => {
            res.status(400).send({
              msg: "machine",
              err,
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).send({
        msg: "mill",
        err,
      });
    });
});

router.get("/currshift", (req, res) => {
  Mill.findOne({}).then((mill) => {
    if (!mill) {
      res.status(400).send({
        msg: "Mill Details not found",
      });
    } else {
      let date = new Date();
      let hr = date.getHours();
      let min = date.getMinutes();
      if (
        (mill.shift1Hr == hr && mill.shift1Min <= min) ||
        (mill.shift1Hr < hr &&
          (mill.shift2Hr > hr || (mill.shift2Hr == hr && mill.shift2Min > min)))
      ) {
        res.send({
          shift: 1,
        });
      } else if (
        (mill.shift2Hr == hr && mill.shift2Min <= min) ||
        (mill.shift2Hr < hr &&
          (mill.shift3Hr > hr || (mill.shift3Hr == hr && mill.shift3Min > min)))
      ) {
        res.send({
          shift: 2,
        });
      } else {
        res.send({
          shift: 3,
        });
      }
    }
  });
});

module.exports = router;
