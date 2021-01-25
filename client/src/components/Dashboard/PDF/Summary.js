import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import Decode from "../../../common/packetDecode";
import func from "../../../common/functions";
const { getCurrShift } = func;

const useStyles = makeStyles((theme) => ({
  value: {
    fontSize: "1.5rem",
    margin: "0",
    textAlign: "center",
  },
  label: {
    fontSize: "1.5rem",
    margin: "0",
  },
  wrapper: {
    padding: "2rem",
    margin: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container: {
    margin: "5px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "1px solid #111",
  },
}));

export default function OverAll(props) {
  const classes = useStyles();
  const [kg, setKg] = React.useState(0);
  const [eff, setEff] = React.useState(0);
  const [doff, setDoff] = React.useState(0);
  const [shift, setShift] = React.useState(" - ");

  const sumArray = (arr) => {
    let sum = arr.reduce((acc, val) => acc + val);
    return sum;
  };
  React.useEffect(() => {
    getCurrShift((err, currShift) => {
      if (!err) {
        setShift(currShift);
      }
    });
  });
  React.useEffect(() => {
    if (props.machines && props.machines.length) {
      let kgArr = props.machines.map((item) => {
        return Decode.kg(item.data);
      });
      setKg(sumArray(kgArr));
    }
    if (props.machines && props.machines.length) {
      let doffArr = props.machines.map((item) => {
        return Decode.doffs(item.data);
      });
      setDoff(sumArray(doffArr));
    }
    if (props.machines && props.machines.length) {
      let effArr = props.machines.map((item) => {
        return Decode.aef(item.data);
      });
      setEff(sumArray(effArr));
    }
  }, [props]);

  return (
    <Paper elevation={3} className={classes.wrapper}>
      <h1 style={{ color: "#222838" }}>Summary</h1>
      <div className={classes.container}>
        <p className={classes.label}>Date</p>
        <p className={classes.value}>{new Date().toDateString()}</p>
      </div>
      <div className={classes.container}>
        <p className={classes.label}>Time</p>
        <p className={classes.value}>
          {new Date().toTimeString().substr(0, 8)}
        </p>
      </div>
      <div className={classes.container}>
        <p className={classes.label}>Shift no</p>
        <p className={classes.value}>{shift}</p>
      </div>

      <div className={classes.container}>
        <p className={classes.label}>Total Kgs</p>
        <p className={classes.value}>
          {/* {Math.round((kg + Number.EPSILON) * 100) / 100} */}
          {Math.round((kg + Number.EPSILON) * 100) / 100}
        </p>
      </div>

      <div className={classes.container}>
        <p className={classes.label}>No of Doffs </p>
        <p className={classes.value}>{doff}</p>
      </div>
      <div className={classes.container}>
        <p className={classes.label}>Actual Efficiency in %</p>
        <p className={classes.value}>
          {Math.round((eff + Number.EPSILON) * 100) / 100}%
        </p>
      </div>
    </Paper>
  );
}
