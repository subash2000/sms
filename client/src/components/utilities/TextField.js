import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import propTypes from "prop-types";
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
      width: "100%",
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
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  numField: {
    //width: "20%",
    minWidth: "100px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  field: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  time: {
    width: "50%",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      justifyContent: "space-evenly",
    },
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
          variant="outlined"
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
          variant="outlined"
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
          variant="outlined"
          required={props.required}
          disabled={props.disabled ? props.disabled : false}
          inputProps={props.inputProps ? props.inputProps : {}}
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

FormText.propTypes = {
  type: propTypes.string.isRequired,
  required: propTypes.bool.isRequired,
  value: propTypes.any.isRequired,
  onChange: propTypes.func.isRequired,
};
