import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import Decode from "../../common/packetDecode";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    //background: theme.palette.primary.dark,
    borderRadius: "5px",
    gap: "2rem",
    padding: "1rem",
  },
  content: {
    background: "#8db596",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    color: "#fff",
    padding: "1rem",
    width: "100%",
    height: "150px",
    //maxWidth: "300px",
    "&:hover": {
      cursor: "pointer",
      width: "102%",
      height: "155px",
      background: "#59886b",
    },
  },
  value: {
    fontSize: "2rem",
    margin: "0",
  },
  label: {
    fontSize: "1rem",
    margin: "0",
  },
  wrapper: {
    padding: "1rem",
  },
  shift: {
    textAlign: "center",
    fontSize: "20",
    color: "#8f6299",
  },
}));

export default function OverAll(props) {
  const classes = useStyles();
  const [kg, setKg] = React.useState(0);
  const [eff, setEff] = React.useState(0);
  const [doff, setDoff] = React.useState(0);

  const sumArray = (arr) => {
    let sum = arr.reduce((acc, val) => acc + val);
    return sum;
  };

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
    <div className={classes.wrapper}>
      <Paper elevation={3} className={classes.container}>
        <Paper elevation={3} className={classes.content}>
          <p className={classes.value}>
            {/* {Math.round((kg + Number.EPSILON) * 100) / 100} */}
            {kg.toFixed(2)}
          </p>
          <p className={classes.label}>Total Kgs</p>
        </Paper>
        <Paper elevation={3} className={classes.content}>
          <p className={classes.value}>{doff}</p>
          <p className={classes.label}>Doffs</p>
        </Paper>
        <Paper elevation={3} className={classes.content}>
          <p className={classes.value}>
            {Math.round((eff + Number.EPSILON) * 100) / 100}%
          </p>
          <p className={classes.label}>Actual Efficiency</p>
        </Paper>
      </Paper>
    </div>
  );
}
