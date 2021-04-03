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
let timeout;

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

  const updateMachines = () => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/machines/all")
      .then((res) => {
        console.log(res.data);
        if (res.data.machines.length) {
          setMachines([...res.data.machines]);
          setFiltered([...res.data.machines]);
        } else {
          setNoMachines(<h2>No Machines Found</h2>);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
        setNoMachines(<h2>No Machines Found</h2>);
      });
    timeout = setTimeout(updateMachines, 2000);
  };

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setNoMachines(
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      );
      updateMachines();
    }
    return () => {
      isMounted = false;
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, []);

  const content = (
    <div>
      <Divider />
      <ToolBar machines={filtered} />

      <FilterOPt
        machines={machines}
        setMachines={setFiltered}
        cache="dashboardOpt"
      />
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
