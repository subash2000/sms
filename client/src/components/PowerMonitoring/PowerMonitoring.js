import React from "react";
import axios from "axios";
import Filter from "../Filter/Filter";
import { makeStyles } from "@material-ui/core";
import GaugeChart from "react-gauge-chart";
const useStyles = makeStyles((theme) => ({
  container: {},
}));
let timeout;
export default function PowerMonitoring() {
  const [machines, setMachines] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [noMachines, setNoMachines] = React.useState(undefined);
  const classes = useStyles();
  const updateMachines = () => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/machines/all")
      .then((res) => {
        console.log(res.data);
        if (res.data.machines.length) {
          setMachines([...res.data.machines]);
          setFiltered([...res.data.machines]);
          setNoMachines(undefined);
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
    updateMachines();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className={classes.container}>
      {noMachines ? (
        noMachines
      ) : (
        <div>
          <Filter
            machines={machines}
            setMachines={setFiltered}
            cache="powerFilter"
          />
          <GaugeChart
            id="gauge-chart1"
            textColor="#111"
            nrOfLevels={5}
            percent={0.5}
            hideText={true}
          >
            Volts
          </GaugeChart>
        </div>
      )}
    </div>
  );
}
