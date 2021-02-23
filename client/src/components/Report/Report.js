import React from "react";
import PageTitle from "../utilities/PageTitle";
import DateField from "../utilities/DateField";
import FormSelect from "../utilities/FormSelect";
import SelectMultiple from "../utilities/SelectMultiple";
import axios from "axios";
import CountSelect from "../utilities/CountSelect";
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
  const [department, setDepartment] = React.useState("All");
  const [count, setCount] = React.useState("All");
  const [departments, setDepartments] = React.useState(["All"]);
  const [counts, setCounts] = React.useState([]);
  const [shifts, setShifts] = React.useState(["1", "2", "3"]);

  const classes = useStyles();

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/departments")
      .then((res) => {
        setDepartments(["All", ...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });

    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/count")
      .then((res) => {
        setCounts([...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });

    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      from,
      to,
      department,
      count,
      shifts,
    });
  };

  return (
    <div>
      <PageTitle text="Production Report" />
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.fields}>
          <div className={classes.inner}>
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
          </div>
          <div className={classes.inner}>
            <FormSelect
              label="Department"
              variant="outlined"
              required={true}
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              menuItems={departments}
            />
            <CountSelect
              label="Count"
              variant="outlined"
              required={true}
              value={count}
              onChange={(e) => {
                setCount(e.target.value);
              }}
              menuItems={counts}
            />
            <SelectMultiple
              selected={shifts}
              setSelected={setShifts}
              menuItems={["1", "2", "3"]}
              label="Shifts"
            />
          </div>
        </div>

        <div style={{ width: "100%", textAlign: "center" }}>
          <Button color="primary" variant="contained" type="submit">
            Generate Report
          </Button>
        </div>
      </form>
    </div>
  );
}
