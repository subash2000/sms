var express = require("express");
var router = express.Router();
let currVal = require("../common/currVal");
const Mill = require("../models/MillModel");
const Machine = require("../models/MachinesModel");
const { shift, getShiftWithDate } = require("../common/getShift");
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
  shift((err, currShift) => {
    if (err) {
      res.status(400).send({
        msg: "No Mill data",
      });
    } else {
      res.send({
        shift: currShift,
      });
    }
  });
});

router.get("/currshiftdate", (req, res) => {
  getShiftWithDate((err, result) => {
    if (err) {
      res.status(400).send({
        msg: err.msg,
      });
    } else {
      res.send({
        shift: result.shift,
        date: result.date,
      });
    }
  });
});

module.exports = router;
