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
              Machine.find({}).then((result) => {
                res.send({ ...currVal, machinesArr: result });
              });
            }
          })
          .catch((err) => {
            res.status(400).send({
              msg: "machine",
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).send({
        msg: "mill",
      });
    });
});

module.exports = router;
