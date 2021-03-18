const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 5000;
const { start } = require("./Socket");
const mongoose = require("mongoose");
const { job } = require("./common/schedule");

mongoose
  .connect("mongodb://localhost:27017/spindleMonitoring", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected(mongoose)");
    start();
    job();
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares.....
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
//app.use("/api/settings", require("./routes/settingsRoute"));
//app.use("/api/settings", require("./routes/countSettings.js"));
app.get("/", (req, res) => {
  res.send({
    msg: "pong",
  });
});
app.use("/api/live", require("./routes/liveRoute"));
app.use("/api/settings/machines", require("./routes/machinesRoute"));
app.use("/api/settings/mill", require("./routes/millRoute"));
app.use("/api/settings/communication", require("./routes/communicationRoute"));
app.use("/api/report", require("./routes/reportRoute"));
//app listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
