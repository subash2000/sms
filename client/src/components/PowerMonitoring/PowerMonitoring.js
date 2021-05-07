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
    width: "90vw",
    justifyContent: "space-around",
    gap: "50px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
    },
  },
  visual: {
    width: "75%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },
  table: {
    width: "25%",
    marginLeft: "1rem",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      margin: "0",
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
  valRow: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  otherVal: {
    background: "#e0e0e0",
    borderRadius: "5px",
    margin: "1rem",
    padding: "0 1rem",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  title: {
    fontWeight: "700",
    fontSize: "1rem",
    display: "inline",
  },
  val: {
    textAlign: "center",
    display: "inline",
  },
  currVal: {
    margin: "1rem",
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
    if (selected) {
      if (selected) {
        let arr = filtered.filter((machine) => {
          return (
            machine.department === selected.department &&
            machine.machine === selected.machine
          );
        });

        if (arr.length) {
          setSelected(arr[0]);
        }
      } else {
        if (filtered.length) setSelected(filtered[0]);
      }
    }
    // eslint-disable-next-line
  }, [filtered]);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Power Monitoring
      </h2>
      {noMachines ? (
        noMachines
      ) : (
        <div className={classes.container}>
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
          <div className={classes.visual}>
            <div className={classes.otherVal}>
              <div className={classes.valRow}>
                <div className={classes.currVal}>
                  <p className={classes.title}>Current Average : </p>
                  <p className={classes.val}>{Decode.currAvg(selected.data)}</p>
                </div>
                <div className={classes.currVal}>
                  <p className={classes.title}>Frequency : </p>
                  <p className={classes.val}>{Decode.freq(selected.data)}</p>
                </div>
                <div className={classes.currVal}>
                  <p className={classes.title}>Active Power : </p>
                  <p className={classes.val}>
                    {Decode.activePower(selected.data)}
                  </p>
                </div>
              </div>
              <div className={classes.valRow}>
                <div className={classes.currVal}>
                  <p className={classes.title}>Reactive Power : </p>
                  <p className={classes.val}>
                    {Decode.reactivePower(selected.data)}
                  </p>
                </div>
                <div className={classes.currVal}>
                  <p className={classes.title}>Active Energy : </p>
                  <p className={classes.val}>
                    {Decode.activeEnergy(selected.data)}
                  </p>
                </div>
                <div className={classes.currVal}>
                  <p className={classes.title}>Reactive Energy : </p>
                  <p className={classes.val}>
                    {Decode.reactiveEnergy(selected.data)}
                  </p>
                </div>
              </div>
            </div>

            <div className={classes.row}>
              <Chart
                label="ry Volt(V)"
                minValue={0}
                maxValue={600}
                value={Decode.ry(selected.data)}
              />
              <Chart
                label="yb Volt(V)"
                minValue={0}
                maxValue={600}
                value={Decode.yb(selected.data)}
              />
              <Chart
                label="br Volt(V)"
                minValue={0}
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
            <div className={classes.row}>
              <Chart
                label="r (Power-Factor)"
                minValue={0}
                maxValue={90}
                value={Decode.r(selected.data)}
              />
              <Chart
                label="y (Power-Factor)"
                minValue={0}
                maxValue={90}
                value={Decode.y(selected.data)}
              />
              <Chart
                label="b (Power-Factor)"
                minValue={0}
                maxValue={90}
                value={Decode.b(selected.data)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
