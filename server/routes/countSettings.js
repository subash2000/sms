var express = require("express");
var router = express.Router();
const Mill = require("../models/MillModel");
const { restart } = require("../Socket");

router.post("/count", (req, res) => {
  const filter = {};
  const options = {
    upsert: true,
  };
  const updateDoc = {
    $addToSet: {
      counts: req.body.counts,
    },
  };

  Mill.updateOne(filter, updateDoc, options)
    .then((result) => {
      restart();
      res.send({
        response: result,
        msg: "Count addes Successfully",
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
      console.log(result);
      if (!result) {
        res.status(400).send({
          msg: "Mill settings not updated yet",
        });
      } else {
        res.send({
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
        counts: { $and: [{ count: req.body.count }, { unit: req.body.unit }] },
      },
    },
    { multi: true }
  )
    .then((result) => {
      restart();
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
module.exports = router;
