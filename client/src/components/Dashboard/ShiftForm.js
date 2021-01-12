import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, makeStyles, Paper } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  field: {
    maxHeight: "100px",
    maxWidth: "300px",
  },
  form: {
    margin: "0 1rem",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  btn: {
    height: "20px",
    padding: "1rem",
    marginBottom: "1rem",
  },
}));

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [shift, setShift] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Paper elevation={3} className={classes.container}>
        <div className={classes.form}>
          <KeyboardDatePicker
            className={classes.field}
            margin="normal"
            label="Choose Date"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            inputVariant="outlined"
          />
          <FormControl variant="filled" className={classes.field}>
            <InputLabel id="shift-label">Choose Shift</InputLabel>
            <Select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              variant="outlined"
              label="Choose Shift"
              labelId="shift-label"
              style={{ paddingTop: "10px" }}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" className={classes.btn} color="primary">
          Apply
        </Button>
      </Paper>
    </MuiPickersUtilsProvider>
  );
}
