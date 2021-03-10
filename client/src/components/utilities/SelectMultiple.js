import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import propTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";

import Checkbox from "@material-ui/core/Checkbox";
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

      textAlign: "left",
    },
  },
  textField: {
    minWidth: "100px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  numField: {
    //width: "20%",
    minWidth: "100px",
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
  const { selected, setSelected } = props;

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  //   const handleChangeMultiple = (event) => {
  //     const { options } = event.target;
  //     const value = [];
  //     for (let i = 0, l = options.length; i < l; i += 1) {
  //       if (options[i].selected) {
  //         value.push(options[i].value);
  //       }
  //     }
  //     setSelected(value);
  //   };

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
          value={selected}
          onChange={handleChange}
          className={classes.textField}
          multiple
          required={true}
          disabled={props.disabled ? props.disabled : false}
          defaultValue=""
          renderValue={(s) => s.join(", ")}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          {props.menuItems.map((item, i) => {
            return (
              <MenuItem key={i} value={item}>
                <Checkbox checked={selected.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
}

FormText.propTypes = {
  label: propTypes.string.isRequired,
  selected: propTypes.array.isRequired,
  setSelected: propTypes.func.isRequired,
  menuItems: propTypes.array.isRequired,
};
