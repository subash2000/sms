import React from "react";
import axios from "axios";
import Table from "./Table";
import PageTitle from "../utilities/PageTitle";
import ToolBar from "./ToolBar";
import { makeStyles } from "@material-ui/styles";
import modules from "../../common/functions";
import { Divider } from "@material-ui/core";

const { getMachines } = modules;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

export default function Live() {
  const [data, setData] = React.useState({});
  const [machines, setMachines] = React.useState([]);

  const [parameters, setParameters] = React.useState([
    "Kg",
    "m/min",
    "tpi",
    "spindle rpm",
    "AEF %",
    "PEF %",
    "Stop min",
    "Doff min",
    "Ukg",
  ]);
  const [selected, setSelected] = React.useState({
    Kg: true,
    "m/min": true,
    tpi: true,
    "spindle rpm": true,
    "AEF %": true,
    "PEF %": true,
    "Stop min": true,
    "Doff min": true,
    Ukg: true,
  });
  const classes = useStyles();
  React.useEffect(() => {
    let interval = setInterval(() => {
      axios
        .get(process.env.REACT_APP_BACKEND + "/api/live")
        .then((res) => {
          setData({ ...res.data });
          console.log({ ...res.data });
        })
        .catch((err) => {
          if (err.response) {
            // console.log(err.response.data);
          }
        });
      getMachines((err, d) => {
        if (err) {
          console.log(err);
        } else {
          //console.log(d.machines);
          setMachines(d.machines);
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={classes.container}>
      <PageTitle text="Dashboard" />
      <Divider />
      <ToolBar
        parameters={parameters}
        setParameters={setParameters}
        selected={selected}
        setSelected={setSelected}
        setMachines={setMachines}
      />
      <Table
        data={data}
        selected={selected}
        parameters={parameters}
        machines={machines}
        setParameters={setParameters}
        setSelected={setSelected}
        setMachines={setMachines}
      />
    </div>
  );
}
