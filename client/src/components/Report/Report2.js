import React from "react";
import PageTitle from "../utilities/PageTitle";
import DateField from "../utilities/DateField";
import SelectMultiple from "../utilities/SelectMultiple";
import axios from "axios";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fields: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8rem",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap: "0",
    },
  },
}));
export default function Report() {
  const [from, setFrom] = React.useState(Date.now());
  const [to, setTo] = React.useState(Date.now());
  const [shifts, setShifts] = React.useState(["1", "2", "3"]);
  const [log, setLog] = React.useState([])

  const classes = useStyles();
  var getDates = function (start, end, cb) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt).toDateString());
    }
    return arr;
  };
  const compareDate = (a,b) => {
    let date1 = Date.parse(a.date)
    let date2 =Date.parse(b.date)
    if(date1 < date2)
      return -1;
    else if(date1>date2)
      return 1;
    return 0;
  }
  const compareShift = (a,b) => {
    
    if(a.shift < b.shift)
      return -1;
    else if(a.shift>b.shift)
      return 1;
    return 0;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND + "/api/report/production", {
      dates: getDates(from, to),
      shifts: shifts.map(item => (parseInt(item))),
    }).then(response => {
     
     if(response.data.result && response.data.result.length)
     {
       let result = [...response.data.result];
       result.sort(compareShift)
       result.sort(compareDate)
       console.log(result)
       setLog(result)

     }
    })
      .catch(error => {
        if (error.response)
          console.log(error.response.data);
      })
  }

  return (
    <div>
      <PageTitle text="Production Report" />
      <form onSubmit={handleSubmit} className={classes.form}>
        <DateField
          value={from}
          setDate={setFrom}
          variant="outlined"
          required={true}
          label="From "
        />
        <DateField
          value={to}
          setDate={setTo}
          variant="outlined"
          required={true}
          label="To"
        />

        <SelectMultiple
          selected={shifts}
          setSelected={setShifts}
          menuItems={["1", "2", "3"]}
          label="Shifts"
        />
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button color="primary" variant="contained" type="submit">
            View
          </Button>
        </div>
      </form>
      {log.length?<h2>Boom u see that</h2>:undefined}
    </div>
  );
}
