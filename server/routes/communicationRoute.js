var express = require("express");
var router = express.Router();
const Machines = require("../models/MachinesModel");
const { getIp } = require("../common/findIp");
const { restartServer } = require("../Socket");
router.post("/single", (req, res) => {
  getIp(req.body.id, (err, ip) => {
    Machines.findOne({
      ip: ip,
    })
      .then((machine) => {
        if (!machine) {
          Machines.updateOne(
            {
              machine: req.body.machine,
              department: req.body.department,
            },
            {
              $set: {
                ...req.body,
                ip: ip,
              },
            }
          )
            .then((response) => {
              restartServer();
              res.send({
                msg: "Communication Details Updated",
                response,
              });
            })
            .catch((error) =>
              res.status(400).send({
                msg: "Update failed " + error,
              })
            );
        } else {
          res.status(400).send({
            msg: "Id/Ip already exists",
          });
        }
      })
      .catch((e) => {
        res.status(400).send({
          msg: "Update Failed",
        });
      });
  });
});

module.exports = router;
