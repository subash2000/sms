import React from "react";
import Modal from "../../utilities/Modal";
import { CircularProgress } from "@material-ui/core";
import Table from "./Table";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import FilterOpt from "./FilterOptions";
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
  const [model, setModel] = React.useState(false);
  const [progress, setProgress] = React.useState(<CircularProgress />);
  const [result, setResult] = React.useState([]);
  const classes = useStyles();

  const updateMachines = () => {
    setResult([]);
    Axios.get(process.env.REACT_APP_BACKEND + "/api/settings/machines/all")
      .then((res) => {
        setProgress(undefined);
        res.data.machines.map((item) => {
          setResult((prev) => [
            ...prev,
            {
              machine: item.machine,
              model: item.model,
              department: item.department,
              currcount:
                item.count && item.count.value
                  ? item.count.value
                  : "Not assingned",
              unit: item.count && item.count.unit ? item.count.unit : "",
              shed: item.shed,
            },
          ]);
          return item;
        });
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
  const closeHandler = () => {
    setModel(false);
  };
  const openHandler = () => {
    setModel(true);
  };
  const applyHandler = () => {
    closeHandler();
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <PageTitle text="Count Assingment" />
      <div className={classes.container}>
        <Modal
          title="Filter Machines"
          open={model}
          setOpen={setModel}
          success="Apply"
          failure="Cancel"
          successHandler={applyHandler}
          failureHandler={closeHandler}
        >
          <FilterOpt />
        </Modal>
      </div>
      {progress ? (
        progress
      ) : (
        <Table
          filterHandler={openHandler}
          machineData={result}
          updateMachines={updateMachines}
        />
      )}
    </div>
  );
}
