import React from "react";
import axios from "axios";
import Filter from "../Filter/Filter";
import { makeStyles } from "@material-ui/core";
import Table from "./Table";
import Chart from "./GaugeChart";
import Decode from "../../common/packetDecode";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    gap: "50px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  visual: {
    width: "65%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  table: {
    width: "35%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  row: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "50px",
  },
  heading: {
    textAlign: "center",
  },
}));
let timeout;
export default function PowerMonitoring() {
  const [machines, setMachines] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [noMachines, setNoMachines] = React.useState(undefined);
  const [selected, setSelected] = React.useState({});
  const classes = useStyles();
  const updateMachines = (count) => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/machines/all")
      .then((res) => {
        console.log(res.data);
        if (res.data.machines.length) {
          setMachines([...res.data.machines]);
          setFiltered([...res.data.machines]);
          setNoMachines(undefined);
          if (count === 0) setSelected(res.data.machines[0]);
          count++;
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
    updateMachines(0);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className={classes.container}>
      {noMachines ? (
        noMachines
      ) : (
        <div className={classes.container}>
          <div className={classes.visual}>
            <div className={classes.row}>
              <Chart
                label="ry Volt(V)"
                minValue={200}
                maxValue={600}
                value={Decode.ry(selected.data)}
              />
              <Chart
                label="yb Volt(V)"
                minValue={200}
                maxValue={600}
                value={Decode.yb(selected.data)}
              />
              <Chart
                label="br Volt(V)"
                minValue={200}
                maxValue={600}
                value={Decode.br(selected.data)}
              />
            </div>
            <div className={classes.row}>
              <Chart
                label="r Ampere(A)"
                minValue={0}
                maxValue={90}
                value={Decode.r(selected.data)}
              />
              <Chart
                label="y Ampere(A)"
                minValue={0}
                maxValue={90}
                value={Decode.y(selected.data)}
              />
              <Chart
                label="b Ampere(A)"
                minValue={0}
                maxValue={90}
                value={Decode.b(selected.data)}
              />
            </div>
          </div>
          <div className={classes.table}>
            <Filter
              machines={machines}
              setMachines={setFiltered}
              cache="power"
            />
            <Table
              machines={filtered}
              setSelected={setSelected}
              selected={selected}
            />
          </div>
        </div>
      )}
    </div>
  );
}
