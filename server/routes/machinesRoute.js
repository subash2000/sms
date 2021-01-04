var express = require("express");
var router = express.Router();
const Machines = require("../models/MachinesModel");

router.get("/all", (req, res) => {
  Machines.find({})
    .then((data) => {
      res.send({
        machines: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

//yet to be corrected
router.post("/setcount", (req, res) => {
  Machines.updateMany(
    {
      $or: [...req.body.filter],
    },
    {
      $set: {
        count: {
          value: req.body.value,
          unit: req.body.unit,
        },
      },
    }
  )
    .then((result) => {
      res.send({
        result,
      });
    })
    .catch((err) => {
      res.status(400).send({ err });
    });
});

router.post("/single/insert", (req, res) => {
  Machines.updateOne(
    {
      machine: req.body.machine,
      department: req.body.department,
    },
    {
      $set: {
        ...req.body,
      },
    },
    {
      upsert: true,
    }
  )
    .then(() => {
      res.send({
        msg: "inserted",
      });
    })
    .catch((err) =>
      res.status(400).send({
        msg: "insert failed " + err,
      })
    );
});

router.post("/multiple/insert", (req, res) => {
  Machines.bulkWrite(
    req.body.machinesArr.map((machine) => ({
      updateOne: {
        filter: { machine: machine.machine, department: machine.department },
        update: { $set: machine },
        upsert: true,
      },
    }))
  )
    .then((result) => {
      res.send({
        response: result,
      });
    })
    .catch((err) => {
      res.status(200).send({
        msg: "error",
        err,
      });
    });
});

router.get("/departments", (req, res) => {
  Machines.aggregate([
    {
      $group: {
        _id: "$department",
      },
    },
  ])
    .then((result) => {
      let departments = result.map((item) => {
        return item._id;
      });
      res.send({
        departments,
      });
    })
    .catch((err) => {
      res.send({
        err,
      });
    });
});

router.get("/models", (req, res) => {
  Machines.aggregate([
    {
      $group: {
        _id: "$model",
      },
    },
  ])
    .then((result) => {
      let models = result.map((item) => {
        return item._id;
      });
      res.send({
        models,
      });
    })
    .catch((err) => {
      res.send({
        err,
      });
    });
});

router.get("/counts", (req, res) => {
  Machines.aggregate([
    {
      $group: {
        _id: {
          count: "$count.value",
          unit: "$count.unit",
        },
      },
    },
  ])
    .then((result) => {
      let counts = result
        .filter((item) => Object.keys(item._id).length > 0)
        .map((item) => {
          return item._id;
        });
      if (counts.length) {
        res.send({
          counts,
        });
      } else {
        res.status(400).send({
          msg: "No Count Data found",
        });
      }
    })
    .catch((err) => {
      res.send({
        err,
      });
    });
});

module.exports = router;
