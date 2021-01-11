import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "./Table";
import FilterBtn from "./FilterBtn";

const useStyles = makeStyles((theme) => ({
  table: {
    //minWidth: 650,
    border: "1px solid " + theme.palette.primary.main,
  },
  normal: {},
  doff: {},
  powerFailure: {
    border: "1px solid red",
  },
  stop: {},
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolBarContent: {},
  tableCell: {},
}));

export default function BasicTable(props) {
  const classes = useStyles();
  const {
    data,
    parameters,
    selected,
    machines,
    setParameters,
    setSelected,
    setMachines,
  } = props;
  const [model, setModel] = React.useState("All");
  const [department, setDepartment] = React.useState("All");
  const [count, setCount] = React.useState("All");

  React.useEffect(() => {
    let cache = localStorage.getItem("dashboardFilterOptions");
    if (cache) {
      let filters = JSON.parse(cache);
      setModel(filters.model);
      setDepartment(filters.department);
      setCount(filters.count);
    }
  }, []);

  let result = machines.filter((machine) => {
    let validModel = model === "All" || model === machine.model;
    let validDept = department === "All" || department === machine.department;
    let validCount =
      count === "All" ||
      (machine.count && count === machine.count.value + machine.count.unit);
    return validCount && validDept && validModel;
  });
  console.log(result);

  return (
    <TableContainer>
      <div className={classes.toolbar}>
        <div className={classes.toolBarContent}>
          <h3>
            {data[Object.keys(data)[0]] &&
            data[Object.keys(data)[0]].data &&
            data[Object.keys(data)[0]].data.data
              ? "Shift No : " + data[Object.keys(data)[0]].data.data[9]
              : "Machines not connected"}
          </h3>
        </div>
        <FilterBtn
          parameters={parameters}
          setParameters={setParameters}
          selected={selected}
          setSelected={setSelected}
          setMachines={setMachines}
          department={department}
          model={model}
          count={count}
          setDepartment={setDepartment}
          setCount={setCount}
          setModel={setModel}
        />
      </div>
      <Table parameters={parameters} result={result} />
    </TableContainer>
  );
}
