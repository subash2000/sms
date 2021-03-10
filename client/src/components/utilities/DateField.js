import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
  let content = (
    <div className={classes.field}>
      <KeyboardDatePicker
        className={classes.textField}
        margin="normal"
        format="dd/MM/yyyy"
        value={props.value}
        onChange={(date) => props.setDate(date)}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        inputVariant={props.variant}
        required={props.required}
        disabled={props.disabled ? props.disabled : false}
        maxDate={props.maxDate}
        maxDateMessage="Invalid Date"
      />
    </div>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.root}>
        <div className={classes.label}>
          <p className={classes.labelText}>
            {props.label.charAt(0).toUpperCase() + props.label.slice(1)}
          </p>
          <p className={classes.colon}>:</p>
        </div>
        {content}
      </div>
    </MuiPickersUtilsProvider>
  );
}
