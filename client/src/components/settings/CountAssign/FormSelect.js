import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.1rem",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  label: {
    display: "flex",
    width: "100%",

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
    marginRight: "2rem",
    [theme.breakpoints.down("xs")]: {
      marginRight: "2rem",
    },
  },
  textField: {
    width: "100%",

    minWidth: "100px",
  },
  numField: {
    width: "20%",
    minWidth: "100px",
  },
  field: {
    width: "100%",
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

  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <p className={classes.labelText}>
          {props.label.charAt(0).toUpperCase() + props.label.slice(1)}
        </p>
        <p className={classes.colon}>:</p>
      </div>
      <div className={classes.field}>
        <Select
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
          className={classes.textField}
        >
          <MenuItem
            value={JSON.stringify({ value: undefined, unit: undefined })}
          >
            <i>None</i>
          </MenuItem>
          {props.menuItems.map((item, i) => {
            return (
              <MenuItem
                key={i}
                value={JSON.stringify({ value: item.value, unit: item.unit })}
              >
                {item.value + " " + item.unit}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
}
