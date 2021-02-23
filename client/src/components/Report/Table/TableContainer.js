import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "./Table";
import FilterBtn from "./Filter/FilterBtn";
import { Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  table: {
    //minWidth: 650,
    border: "1px solid " + theme.palette.primary.main,
  },
  normal: {},
  doff: {},

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
    cacheParam,
    cacheOpt,
    shift,
  } = props;
  const [model, setModel] = React.useState("All");
  const [department, setDepartment] = React.useState("All");
  const [count, setCount] = React.useState("All");

  // console.log(result);
  const printPdf = () => {
    window.print();
  };

  return (
    <Paper elevation={3} style={{ padding: "1rem" }}>
      <TableContainer>
        <div className={classes.toolbar}>
          <h3 className={classes.shift}>Shift No : {shift}</h3>
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
              cacheParam={cacheParam}
              cacheOpt={cacheOpt}
            />
          </div>
        </div>
        <Table parameters={parameters} result={machines} />
      </TableContainer>
    </Paper>
  );
}
