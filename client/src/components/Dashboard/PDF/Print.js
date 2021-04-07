import React from "react";
import Table from "./Table";
// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   summary: {
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//   },
//   statusContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//     gap: "2rem",
//   },
//   status: {
//     display: "flex",

//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: "0.5rem",
//   },
//   dot: {
//     height: "15px",
//     width: "15px",

//     borderRadius: "50%",
//     display: "inline-block",
//   },
// }));

export default function Print(props) {
  const [model, setModel] = React.useState("All");
  const [department, setDepartment] = React.useState("All");
  const [count, setCount] = React.useState("All");
  // const classes = useStyles();

  React.useEffect(() => {
    let cache = localStorage.getItem("dashboardFilterOptions");
    if (cache) {
      let filters = JSON.parse(cache);
      setModel(filters.model);
      setDepartment(filters.department);
      setCount(filters.count);
    }
  }, []);

  const { machines, parameters } = props;

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
      <Table
        shift={1}
        date={new Date().toDateString()}
        machines={machines}
        count={count}
        department={department}
        model={model}
        parameters={parameters}
      />
    </div>
  );
}
