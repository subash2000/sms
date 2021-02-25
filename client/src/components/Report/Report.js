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
import Print from "./PDF/Print";
import FilterOPt from "../Filter/Filter";
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
  const [shift, setShift] = React.useState("3");
  const [load, setLoad] = React.useState(false);
  const [content, setContent] = React.useState(undefined);
  const [machines, setMachines] = React.useState([]);
  const [parameters, setParameters] = React.useState([...func.parameters]);
  const [filtered, setFiltered] = React.useState([]);

  const classes = useStyles();

  React.useEffect(() => {
    let cachedSelected = localStorage.getItem("reportParam");

    if (cachedSelected) {
      let obj = JSON.parse(cachedSelected);
      let paramArr = Object.keys(obj).filter((item) => obj[item] === true);
      setParameters(paramArr);
    }

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (machines.length > 0) {
      setContent(
        <div>
          <Divider />
          <ToolBar machines={filtered} />

          <div>
            <FilterOPt
              machines={machines}
              setMachines={setFiltered}
              cache="reportOpt"
            />
          </div>
          <TableContainer
            parameters={parameters}
            machines={filtered}
            setParameters={setParameters}
            setMachines={setMachines}
            cacheParam="reportParam"
            shift={shift}
          />

          <div className="section-to-print">
            {/* <div> */}
            <Print
              parameters={parameters}
              machines={filtered}
              shift={shift}
              date={date}
            />
          </div>
        </div>
      );
    }
    // eslint-disable-next-line
  }, [filtered, parameters]);
  const viewHandler = (e) => {
    e.preventDefault();
    setContent(undefined);
    setLoad(true);
    Axios.post(process.env.REACT_APP_BACKEND + "/api/report", {
      date: new Date(date).toDateString(),
      shift: parseInt(shift),
    })
      .then((res) => {
        setLoad(false);
        if (res.data.machines && res.data.machines.length) {
          setMachines([...res.data.machines]);
          setFiltered([...res.data.machines]);
        }
      })
      .catch((err) => {
        if (err.response) {
          setContent(<Alert type="warning" msg={err.response.data.msg} />);
          setLoad(false);
        }
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
