import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "./Table";
import FilterBtn from "../Filter/FilterBtn";
import func from "../../../common/functions";
import { Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import Tooltip from "@material-ui/core/Tooltip";

const { getCurrShift } = func;
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
  rightSide: {
    display: "flex",
  },
}));

export default function BasicTable(props) {
  const classes = useStyles();
  const {
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
  const [shift, setShift] = React.useState("");

  React.useEffect(() => {
    let cache = localStorage.getItem("dashboardFilterOptions");
    if (cache) {
      let filters = JSON.parse(cache);
      setModel(filters.model);
      setDepartment(filters.department);
      setCount(filters.count);
    }
  }, []);

  React.useEffect(() => {
    getCurrShift((err, res) => {
      if (err) setShift("Error Connecting to server");
      else setShift(res);
    });
    let interval = setInterval(() => {
      getCurrShift((err, res) => {
        if (err) setShift("Error Connecting to server");
        else setShift(res);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  let result = machines.filter((machine) => {
    let validModel = model === "All" || model === machine.model;
    let validDept = department === "All" || department === machine.department;
    let validCount =
      count === "All" ||
      (machine.count && count === machine.count.value + machine.count.unit);
    return validCount && validDept && validModel;
  });

  // console.log(result);
  const printPdf = () => {
    window.print();
  };

  return (
    <Paper elevation={3} style={{ padding: "1rem" }}>
      <TableContainer>
        <div className={classes.toolbar}>
          <h3 className={classes.shift}>Shift No : {shift}</h3>
          <div className={classes.statusContainer}>
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
          </div>
          <div className={classes.rightSide}>
            <Tooltip title="Print" placement="top">
              <IconButton color="primary" component="span" onClick={printPdf}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
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
        </div>
        <Table parameters={parameters} result={result} />
      </TableContainer>
    </Paper>
  );
}
