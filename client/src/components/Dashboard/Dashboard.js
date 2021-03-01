import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import ToolBar from "./ToolBar";
import TableContainer from "./Table/TableContainer";
import { Divider, CircularProgress } from "@material-ui/core";
import Print from "./PDF/Print";
import func from "../../common/functions";
import "./styles.css";
import FilterOPt from "../Filter/Filter";
// import FilterParam from "../Filter/FilterParam";

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
  const [filtered, setFiltered] = React.useState([]);
  const [parameters, setParameters] = React.useState([...func.parameters]);
  // const [headCells, setHeadCells] = React.useState([...func.parameters]);
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
                if (isMounted) {
                  console.log(res.data);
                  setMachines([...res.data.machines]);
                  setFiltered([...res.data.machines]);
                }
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
      <ToolBar machines={filtered} />
      <div>
        <FilterOPt
          machines={machines}
          setMachines={setFiltered}
          cache="dashboardOpt"
        />
        {/* <FilterParam
          cache="dashboardParam"
          parameters={parameters}
          setParameters={setHeadCells}
        /> */}
      </div>
      <TableContainer
        selected={selected}
        parameters={parameters}
        machines={filtered}
        setParameters={setParameters}
        setSelected={setSelected}
        setMachines={setMachines}
        cacheParam="liveParameters"
      />
      <div className="section-to-print">
        <Print parameters={parameters} machines={filtered} />
      </div>
    </div>
  );
  return (
    <div className={classes.container}>
      <h2 align="center" style={{ marginBottom: "2rem" }}>
        Dashboard
      </h2>

      {machines.length > 0 ? <div>{content}</div> : noMachines}
    </div>
  );
}
