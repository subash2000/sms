var express = require("express");
var router = express.Router();
const Machines = require("../models/MachinesModel");
const { restartAll, restart } = require("../Socket");
const { shift } = require("../common/getShift");
router.get("/all", (req, res) => {
  Machines.find({})
    .sort({ machine: 1 })
    .then((data) => {
      let date = new Date();
      shift((err, currshift) => {
        let filtered = data.map((machine) => {
          if (!machine.data) return machine._doc;
          else {
            if (
              machine._doc.data &&
              machine._doc.data.length &&
              machine._doc.data.length > 9 &&
              // (machine._doc.data[6] === date.getDate() ||
              //   (machine._doc.data[6] === date.getDate() - 1 &&
              //     currshift === 3)) &&
              // machine._doc.data[7] === date.getMonth() + 1 &&
              // machine._doc.data[8] === date.getFullYear() - 2000 &&
              machine._doc.data[9] === currshift
            ) {
              return machine._doc;
            } else {
              return {
                ...machine._doc,
                data: undefined,
              };
            }
          }
        });
        Promise.all([filtered]).then(() => {
          res.send({
            machines: filtered,
          });
        });
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
      restartAll();
      res.send({
        result,
      });
    })
    .catch((err) => {
      res.status(400).send({ err });
    });
});
router.post("/single/update", (req, res) => {
  Machines.updateOne(
    {
      machine: req.body.machine,
      department: req.body.department,
    },
    {
      $set: {
        ...req.body,
      },
    }
  )
    .then(() => {
      restart(req.body.department, req.body.machine);
      res.send({
        msg: "updated",
      });
    })
    .catch((err) =>
      res.status(400).send({
        msg: "update failed " + err,
      })
    );
});
router.post("/single/delete", (req, res) => {
  Machines.deleteOne({
    machine: req.body.machine,
    department: req.body.department,
  })
    .then((result) => {
      if (result.deletedCount == 0) {
        res.status(400).send({
          msg: "Delete failed ",
          result,
        });
      } else {
        restart(req.body.department, req.body.machine);
        res.send({
          msg: "deleted",
        });
      }
    })
    .catch((err) =>
      res.status(400).send({
        msg: "Delete failed ",
        err,
      })
    );
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
      restart(req.body.department, req.body.machine);
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
      restartAll();
      res.send({
        response: result,
      });
    })
    .catch((err) => {
      res.status(400).send({
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
