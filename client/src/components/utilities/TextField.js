import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.1rem",
    margin: "1rem",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  label: {
    display: "flex",
    width: "50%",

    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
    },
  },
  colon: {
    textAlign: "center",
    marginRight: "2rem",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0",
    },
  },
  text: {
    textAlign: "left",
  },
  labelText: {
    textAlign: "right",
    marginRight: "6rem",
    [theme.breakpoints.down("xs")]: {
      marginRight: "2rem",
    },
  },
  textField: {
    // width: "50%",
    minWidth: "100px",
  },
  numField: {
    //width: "20%",
    minWidth: "100px",
  },
  field: {
    width: "50%",
  },
  time: {
    width: "50%",
    display: "flex",
  },
  timeField: {
    width: "20%",
    minWidth: "80px",
  },
  gap: {
    width: "20px",
  },
}));
export default function FormText(props) {
  const classes = useStyles();
  let content = undefined;
  if (props.type === "time") {
    content = (
      <div className={classes.time}>
        <TextField
          className={classes.textField + " " + classes.timeField}
          type="number"
          value={props.hr}
          onChange={(e) => props.setHr(e.target.value)}
          variant={props.variant}
          required={props.required ? props.required : false}
          disabled={props.disabled ? props.disabled : false}
          helperText="HH(hours)"
        />
        <div className={classes.gap}></div>
        <p>:</p>
        <div className={classes.gap}></div>

        <TextField
          className={classes.textField + " " + classes.timeField}
          type="number"
          value={props.min}
          onChange={(e) => props.setMin(e.target.value)}
          variant={props.variant}
          required={props.required ? props.required : false}
          disabled={props.disabled ? props.disabled : false}
          helperText="MM(Minutes)"
        />
      </div>
    );
  } else {
    content = (
      <div className={classes.field}>
        <TextField
          className={
            classes.textField +
            " " +
            (props.type === "number" ? classes.numField : "")
          }
          type={props.type}
          value={props.value}
          onChange={
            props.onChange
              ? props.onChange
              : (e) => props.setVal(e.target.value)
          }
          variant={props.variant}
          required={props.required}
          disabled={props.disabled ? props.disabled : false}
        />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <p className={classes.labelText}>
          {props.label.charAt(0).toUpperCase() + props.label.slice(1)}
        </p>
        <p className={classes.colon}>:</p>
      </div>
      {content}
    </div>
  );
}
