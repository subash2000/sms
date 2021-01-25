import React from "react";
import Table from "./Table";
import Summary from "./Summary";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  summary: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  statusContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
  },
  status: {
    display: "flex",

    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
  },
  dot: {
    height: "15px",
    width: "15px",

    borderRadius: "50%",
    display: "inline-block",
  },
}));

export default function Print(props) {
  const [model, setModel] = React.useState("All");
  const [department, setDepartment] = React.useState("All");
  const [count, setCount] = React.useState("All");
  const classes = useStyles();

  React.useEffect(() => {
    document.title = "Dashboard";
    let cache = localStorage.getItem("dashboardFilterOptions");
    if (cache) {
      let filters = JSON.parse(cache);
      setModel(filters.model);
      setDepartment(filters.department);
      setCount(filters.count);
    }
  }, []);

  const { machines, parameters } = props;
  let result = machines.filter((machine) => {
    let validModel = model === "All" || model === machine.model;
    let validDept = department === "All" || department === machine.department;
    let validCount =
      count === "All" ||
      (machine.count && count === machine.count.value + machine.count.unit);
    return validCount && validDept && validModel;
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2rem",
      }}
      className="section-to-print"
    >
      {/* <div className={classes.statusContainer}>
        <div className={classes.status}>
          <span
            className={classes.dot}
            style={{ backgroundColor: "green" }}
          ></span>
          <p className={classes.text}>Running</p>
        </div>
        <div className={classes.status}>
          <span
            className={classes.dot}
            style={{ backgroundColor: "brown" }}
          ></span>
          <p className={classes.text}>No Communication</p>
        </div>
        <div className={classes.status}>
          <span
            className={classes.dot}
            style={{ backgroundColor: "red" }}
          ></span>
          <p className={classes.text}>Power Failure</p>
        </div>
        <div className={classes.status}>
          <span
            className={classes.dot}
            style={{ backgroundColor: "blue" }}
          ></span>
          <p className={classes.text}>Doff</p>
        </div>
      </div> */}
      <Table parameters={parameters} result={result} />
      <div className={classes.summary}>
        <Summary machines={result} />
      </div>
    </div>
  );
}
