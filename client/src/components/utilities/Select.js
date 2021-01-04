import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    width: "auto",
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={age}
        onChange={handleChange}
        label={props.label}
        className={classes.select}
      >
        {props.menuitems.map((item, key) => {
          return (
            <MenuItem key={key} value={key}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
