var express = require("express");
var router = express.Router();
const Mill = require("../models/MillModel");
const { restartAll } = require("../Socket");

router.post("/", (req, res) => {
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

router.post("/count", (req, res) => {
  const filter = {};
  const options = {
    upsert: true,
  };
  const updateDoc = {
    $addToSet: {
      counts: req.body.count,
    },
  };

  Mill.updateOne(filter, updateDoc, options)
    .then((result) => {
      res.send({
        response: result,
        msg: "Count added Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        err,
      });
    });
});
router.get("/count", (req, res) => {
  Mill.findOne({})
    .then((result) => {
      if (!result) {
        res.status(400).send({
          msg: "Mill settings not updated yet",
        });
      } else if (result.counts && result.counts.length) {
        res.send({
          data: result.counts,
        });
      } else {
        res.status(400).send({
          msg: "No data Available",
          data: result.counts,
        });
      }
    })
    .catch((err) => {
      res.send({
        msg: "Cannot get count details",
      });
    });
});

router.post("/count/delete", (req, res) => {
  Mill.updateOne(
    {},
    {
      $pull: {
        counts: { $and: [{ value: req.body.value }, { unit: req.body.unit }] },
      },
    },
    { multi: true }
  )
    .then((result) => {
      res.send({
        msg: "Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        msg: "Cannot Delete count!Try later",
      });
    });
});

router.post("/department", (req, res) => {
  const filter = {};
  const options = {
    upsert: true,
  };
  const updateDoc = {
    $addToSet: {
      departments: req.body.department,
    },
  };

  Mill.updateOne(filter, updateDoc, options)
    .then((result) => {
      res.send({
        response: result,
        msg: "Department added Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        err,
      });
    });
});
router.get("/departments", (req, res) => {
  Mill.findOne({})
    .then((result) => {
      if (!result) {
        res.status(400).send({
          msg: "Mill settings not updated yet",
        });
      } else if (
        result.departments &&
        result.departments.length &&
        result.departments[0]
      ) {
        res.send({
          data: result.departments,
        });
      } else {
        res.status(400).send({
          msg: "No data Available",
        });
      }
    })
    .catch((err) => {
      res.send({
        msg: "Cannot get department details",
      });
    });
});

router.post("/department/delete", (req, res) => {
  Mill.updateOne(
    {},
    {
      $pull: {
        departments: req.body.department,
      },
    },
    { multi: true }
  )
    .then((result) => {
      res.send({
        msg: "Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        msg: "Cannot Delete department!Try later",
      });
    });
});

router.post("/model", (req, res) => {
  const filter = {};
  const options = {
    upsert: true,
  };
  const updateDoc = {
    $addToSet: {
      models: req.body.model,
    },
  };

  Mill.updateOne(filter, updateDoc, options)
    .then((result) => {
      res.send({
        response: result,
        msg: "Model added Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        err,
      });
    });
});
router.get("/models", (req, res) => {
  Mill.findOne({})
    .then((result) => {
      if (!result) {
        res.status(400).send({
          msg: "Mill settings not updated yet",
        });
      } else if (result.models && result.models.length && result.models[0]) {
        res.send({
          data: result.models,
        });
      } else {
        res.status(400).send({
          msg: "No data Available",
        });
      }
    })
    .catch((err) => {
      res.send({
        msg: "Cannot get model details",
      });
    });
});

router.post("/model/delete", (req, res) => {
  Mill.updateOne(
    {},
    {
      $pull: {
        models: req.body.model,
      },
    },
    { multi: true }
  )
    .then((result) => {
      res.send({
        msg: "Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        msg: "Cannot Delete model!Try later",
      });
    });
});

module.exports = router;
