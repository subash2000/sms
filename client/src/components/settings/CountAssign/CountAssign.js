import React from "react";
import { CircularProgress } from "@material-ui/core";
import Table from "./Table";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import PageTitle from "../../utilities/PageTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  container: {
    width: "100%",
    display: "flex",
    //justifyContent: "flex-end",
    alignItems: "center",
  },
  selects: {
    width: "100%",
    display: "flex",
  },
  iconbtn: {
    background: theme.palette.primary.main,
  },
}));

export default function CountAssign() {
  const [progress, setProgress] = React.useState(<CircularProgress />);
  const [result, setResult] = React.useState([]);
  const classes = useStyles();

  const updateMachines = () => {
    Axios.get(process.env.REACT_APP_BACKEND + "/api/settings/machines/all")
      .then((res) => {
        setProgress(undefined);
        setResult([...res.data.machines]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
        console.log("Error " + err);
        setProgress(<h2>Can't connect to the server</h2>);
      });
  };
  React.useEffect(() => {
    updateMachines();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <PageTitle text="Count Assingment" />

      {progress ? (
        progress
      ) : (
        <Table machineData={result} updateMachines={updateMachines} />
      )}
    </div>
  );
}
