import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    //background: theme.palette.primary.dark,
    borderRadius: "5px",
    gap: "2rem",
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
}));

export default function OverAll(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.content}>
        <p className={classes.value}>{props.overall.kg}</p>
        <p className={classes.label}>Total Kgs</p>
      </Paper>
      <Paper elevation={3} className={classes.content}>
        <p className={classes.value}>{props.overall.doff}</p>
        <p className={classes.label}>Doffs</p>
      </Paper>
      <Paper elevation={3} className={classes.content}>
        <p className={classes.value}>{props.overall.actEff}%</p>
        <p className={classes.label}>Actual Efficiency</p>
      </Paper>
    </div>
  );
}
