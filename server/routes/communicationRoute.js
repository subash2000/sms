var express = require("express");
var router = express.Router();
const Machines = require("../models/MachinesModel");
const { getIp, getIps } = require("../common/findIp");

const combineAsArr = (obj, ipArray, cb) => {
  let machinesArr = [];
  for (
    let i = 0, j = obj.from, k = obj.fromId;
    i < ipArray.length;
    i++, j++, k++
  ) {
    machinesArr.push({
      machine: j,
      id: k,
      ip: ipArray[i],
      department: obj.department,
    });
    if (i == ipArray.length - 1) cb(machinesArr);
  }
};

router.post("/single", (req, res) => {
  getIp(req.body.id, (err, ip) => {
    Machines.findOne({
      ip: ip,
    })
      .then((machine) => {
        if (!machine || machine.id === req.body.id) {
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
            msg: "Id/Ip already taken",
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

router.post("/multiple", (req, res) => {
  getIps(req.body, (err, ipArray) => {
    if (err) res.status(400).send({ err });
    else {
      Machines.bulkWrite(
        ipArray.map((machine) => {
          return {
            updateOne: {
              filter: {
                machine: machine.machine,
                department: machine.department,
              },
              update: {
                $set: {
                  ip: machine.ip,
                  id: machine.id,
                },
              },
            },
          };
        })
      )
        .then((response) => {
          res.send({
            response,
          });
        })
        .catch((error) => {
          res.status(400).send({
            error,
          });
        });

      // Machines.find({
      //   ip: { $in: [...ipArray] },
      // }).then((result) => {
      //   if (result.length) {
      //     res.status(400).send({
      //       msg: "ID/IP already exists",
      //     });
      //   } else {
      //     let machinesArr = [];
      //     combineAsArr(req.body, ipArray, (arr) => {
      //       machinesArr = [...arr];
      //       Machines.bulkWrite(
      //         machinesArr.map((machine) => ({
      //           updateOne: {
      //             filter: {
      //               machine: machine.machine,
      //               department: machine.department,
      //             },
      //             update: { $set: machine },
      //           },
      //         }))
      //       )
      //         .then((response) => {
      //           res.send({
      //             response: response,
      //           });
      //         })
      //         .catch((error) => {
      //           res.status(400).send({
      //             msg: "error",
      //             error,
      //           });
      //         });
      //     });
      //   }
      // });
    }
  });
});

module.exports = router;
