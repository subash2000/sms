import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import propTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  container: {
    // width: "100%",
    padding: "1rem",
    margin: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
      maxWidth: "90vw",
      display: "block",
    },
  },
  options: {
    width: "90%",
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "auto",
      justifyContent: "flex-start",
    },
  },

  formControl: {
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
    },
  },
}));
export default function Filter(props) {
  const [department, setDepartment] = React.useState("All");
  const [count, setCount] = React.useState("All");
  const [model, setModel] = React.useState("All");
  const [departments, setDepartments] = React.useState(["All"]);
  const [counts, setCounts] = React.useState([{ value: "All", unit: "" }]);
  const [models, setModels] = React.useState(["All"]);
  const classes = useStyles();
  const { cache } = props;

  React.useEffect(() => {
    let cacheValue = localStorage.getItem(cache);
    if (cacheValue) {
      let obj = JSON.parse(cacheValue);
      setCount(obj.count);
      setDepartment(obj.department);
      setModel(obj.model);
    }
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/departments")
      .then((res) => {
        setDepartments(["All", ...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/models")
      .then((res) => {
        setModels(["All", ...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/count")
      .then((res) => {
        setCounts([{ value: "All", unit: "" }, ...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    props.setMachines([
      ...props.machines.filter((item) => {
        let dep = department === "All" || item.department === department;
        let mod = model === "All" || item.model === model;
        let c =
          count === "All" ||
          (item.count && count === item.count.value + item.count.unit);
        return dep && mod && c;
      }),
    ]);

    localStorage.setItem(cache, JSON.stringify({ model, count, department }));
    // eslint-disable-next-line
  }, [model, department, count, props.machines]);

  return (
    <Paper elevation={3} className={classes.container}>
      <div className={classes.options}>
        <FormControl className={classes.formControl}>
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {departments.map((item, i) => {
              return (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="model-label">model</InputLabel>
          <Select
            labelId="model-label"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {models.map((item, i) => {
              return (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="count-label">Count</InputLabel>
          <Select
            labelId="count-label"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {counts.map((item, i) => {
              return (
                <MenuItem key={i} value={item.value + item.unit}>
                  {item.value + " " + item.unit}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </Paper>
  );
}
Filter.propTypes = {
  machines: propTypes.array.isRequired,
  setMachines: propTypes.func.isRequired,
  cache: propTypes.string.isRequired,
};
