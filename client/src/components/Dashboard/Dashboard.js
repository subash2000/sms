import React from "react";
import axios from "axios";
import TableContainer from "./Table/TableContainer";
import ToolBar from "./ToolBar";
import { makeStyles } from "@material-ui/styles";
import { Divider, CircularProgress } from "@material-ui/core";
import Print from "./PDF/Print";
import func from "../../common/functions";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    //width: "100%",
  },
}));

export default function Live() {
  const [noMachines, setNoMachines] = React.useState(undefined);
  const [machines, setMachines] = React.useState([]);
  const [parameters, setParameters] = React.useState([...func.parameters]);

  const [selected, setSelected] = React.useState({});
  const classes = useStyles();
  React.useState(() => {
    let isMounted = true;
    let resObj = {};
    let p = parameters.map((val) => (resObj[val] = true));
    Promise.all([p]).then(() => {
      if (isMounted) setSelected(resObj);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    let interval;
    let isMounted = true;
    if (isMounted)
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
          interval = setInterval(() => {
            axios
              .get(process.env.REACT_APP_BACKEND + "/api/settings/machines/all")
              .then((res) => {
                if (isMounted) setMachines([...res.data.machines]);
              })
              .catch((err) => {
                if (err.response) {
                  console.log(err.response.data);
                  if (isMounted) setNoMachines(<h2>No Machines Found</h2>);
                }
              });
          }, 1000);
        }
      })
      .catch((err) => {
        if (isMounted) setNoMachines(<h2>Can't Connect to server</h2>);
      });
    return () => {
      if (interval) clearInterval(interval);
      isMounted = false;
    };
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
        cacheParam="liveParameters"
        cacheOpt="dashboardFilterOptions"
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
