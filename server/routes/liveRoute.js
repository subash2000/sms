var express = require("express");
var router = express.Router();
let currVal = require("../common/currVal");
const Mill = require("../models/MillModel");
const Machine = require("../models/MachinesModel");
const Log = require("../models/LogModel");

router.get("/", (req, res) => {
  Mill.findOne({})
    .then((result) => {
      if (!result) {
        res.status(400).send({
          msg: "mill",
        });
      } else {
        Machine.findOne({})
          .then((doc) => {
            if (!doc) {
              res.status(400).send({
                msg: "machine",
              });
            } else if (!Object.keys(currVal).length) {
              res.status(400).send({
                msg: "connection/communication",
              });
            } else {
              Machine.find({}).then((machines) => {
                res.send({ ...currVal, machinesArr: machines });
              });
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
        (mill.shift1Hr == hr && mill.shift1Min == min) ||
        (mill.shift1Hr <= hr && mill.shift2Hr > hr)
      ) {
        res.send({
          shift: 1,
        });
      } else if (
        (mill.shift2Hr == hr && mill.shift2Min == min) ||
        (mill.shift2Hr <= hr && mill.shift3Hr > hr)
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
