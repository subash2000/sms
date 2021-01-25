import React from "react";
import axios from "axios";
import TableContainer from "./Table/TableContainer";
import ToolBar from "./ToolBar";
import { makeStyles } from "@material-ui/styles";
import { Divider, CircularProgress } from "@material-ui/core";
import Print from "./PDF/Print";
import "./styles.css";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    //width: "100%",
  },
}));

export default function Live() {
  const [machines, setMachines] = React.useState([]);
  const [noMachines, setNoMachines] = React.useState(undefined);

  const [parameters, setParameters] = React.useState([
    "Model",
    "Count",
    "Kg",
    "m/min",
    "tpi",
    "spindle rpm",
    "AEF %",
    "PEF %",
    "Stops",
    "Stop min",
    "Doffs",
    "Doff min",
    "Ukg",
  ]);
  const [selected, setSelected] = React.useState({
    Model: true,
    Count: true,
    Kg: true,
    "m/min": true,
    tpi: true,
    "spindle rpm": true,
    "AEF %": true,
    "PEF %": true,
    Stops: true,
    "Stop min": true,
    Doffs: true,
    "Doff min": true,
    Ukg: true,
  });
  const classes = useStyles();
  React.useEffect(() => {
    setNoMachines(
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
        <h3>Make sure you updated the settings</h3>
      </div>
    );
    axios
      .get(process.env.REACT_APP_BACKEND)
      .then((response) => {
        if (response.data.msg === "pong") {
          let interval = setInterval(() => {
            axios
              .get(process.env.REACT_APP_BACKEND + "/api/settings/machines/all")
              .then((res) => {
                setMachines([...res.data.machines]);
              })
              .catch((err) => {
                if (err.response) {
                  console.log(err.response.data);
                  setNoMachines(<h2>No Machines Found</h2>);
                }
              });
          }, 1000);
          return () => {
            clearInterval(interval);
          };
        }
      })
      .catch((err) => {
        setNoMachines(<h2>Can't Connect to server</h2>);
      });
  }, []);

  const content = (
    <div>
      <Divider />
      <ToolBar machines={machines} />
      <TableContainer
        selected={selected}
        parameters={parameters}
        machines={machines}
        setParameters={setParameters}
        setSelected={setSelected}
        setMachines={setMachines}
      />
      <div className="section-to-print">
        <Print parameters={parameters} machines={machines} />
      </div>
    </div>
  );
  return (
    <div className={classes.container}>
      <h2 align="center" style={{ marginBottom: "2rem" }}>
        Dashboard
      </h2>
      {machines.length > 1 ? <div>{content}</div> : noMachines}
    </div>
  );
}
