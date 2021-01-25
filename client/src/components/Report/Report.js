import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import DateField from "../utilities/DateField";
import Alert from "../utilities/Alert";
import FormSelect from "../utilities/FormSelect";

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

  const classes = useStyles();

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
        setContent(<h2>Boom see the content</h2>);
      })
      .catch((err) => {
        if (err.response) {
          setContent(<Alert type="warning" msg={err.response.data.msg} />);
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
