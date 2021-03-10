var express = require("express");
var router = express.Router();
const Mill = require("../models/MillModel");
const Machine = require("../models/MachinesModel");
const { restart,restartAll } = require("../Socket");

router.post("/mill", (req, res) => {
  const filter = {};
  const options = {
    upsert: true,
  };
  const updateDoc = {
    $set: {
      ...req.body,
    },
  };
  Mill.updateOne(filter, updateDoc, options)
    .then(() => {
      restartAll();
      res.send({ msg: "Mill Details updated successfully" });
    })
    .catch((err) =>
      res.status(400).send({
        msg: "update failed " + err,
      })
    );
});

router.post("/communication", (req, res) => {
  Machine.updateOne(
    {
      machine: parseInt(req.body.machine),
      type: req.body.type,
    },
    {
      $set: {
        id: parseInt(req.body.id),
        ip: req.body.ip,
      },
    }
  )
    .then(() => {
      restartAll();
      res.send({
        msg: "Updated Successfully",
      });
    })
    .catch((err) =>
      res.status(400).send({
        msg: "Update failed Try again later " + err,
      })
    );
});

router.get("/milldata", (req, res) => {
  Mill.findOne({}, (err, result) => {
    if (err) {
      res.status(400).send({
        err,
      });
    } else {
      res.send({
        result,
      });
    }
  });
});
module.exports = router;
