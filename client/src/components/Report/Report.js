import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import DateField from "../utilities/DateField";
import Alert from "../utilities/Alert";
import FormSelect from "../utilities/FormSelect";
import ToolBar from "./ToolBar";
import TableContainer from "./Table/TableContainer";
import { Divider } from "@material-ui/core";
import func from "../../common/functions";

const useStyles = makeStyles((theme) => ({
  btn: {
    textAlign: "center",
    margin: "auto",
  },
  load: {
    width: "100%",
    textAlign: "center",
    margin: "5rem 0 0 0",
  },
}));

export default function Report() {
  const [date, setDate] = React.useState(Date.now());
  const [shift, setShift] = React.useState("2");
  const [load, setLoad] = React.useState(false);
  const [content, setContent] = React.useState(undefined);
  const [machines, setMachines] = React.useState([]);
  const [parameters, setParameters] = React.useState([...func.parameters]);

  const [selected, setSelected] = React.useState({});

  const classes = useStyles();

  React.useEffect(() => {
    if (machines.length > 0) {
      console.log(parameters);
      setContent(
        <div>
          <Divider />
          <ToolBar machines={machines} setMachines={setMachines} />
          <TableContainer
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
    // eslint-disable-next-line
  }, [machines]);
  const viewHandler = (e) => {
    e.preventDefault();
    setContent(undefined);
    setLoad(true);
    Axios.post(process.env.REACT_APP_BACKEND + "/api/report", {
      date: new Date(date).toDateString(),
      shift: parseInt(shift),
    })
      // .get(process.env.REACT_APP_BACKEND + "/api/settings/machines/all")
      .then((res) => {
        setLoad(false);
        console.log(res.data);
        if (res.data.machines && res.data.machines.length) {
          setMachines([...res.data.machines]);
        }
      })
      .catch((err) => {
        if (err.response) {
          setContent(<Alert type="warning" msg={err.response.data.msg} />);
          setParameters([...func.parameters]);
        }
        setLoad(false);
      });
  };

  return (
    <div className={classes.container}>
      <h2 style={{ textAlign: "center" }}>Report</h2>
      <form className={classes.form} onSubmit={viewHandler}>
        <DateField
          value={date}
          setDate={setDate}
          variant="outlined"
          required={true}
          label="Date"
        />
        <FormSelect
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          variant="outlined"
          label="Shift"
          menuItems={["1", "2", "3"]}
        />
        <div className={classes.btn}>
          <Button type="submit" variant="contained" color="primary">
            View
          </Button>
        </div>
      </form>
      {load ? (
        <div className={classes.load}>
          <CircularProgress />
        </div>
      ) : (
        content
      )}
    </div>
  );
}
