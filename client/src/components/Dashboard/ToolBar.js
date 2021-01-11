import React from "react";
import { makeStyles } from "@material-ui/styles";
import OverAll from "./OverAll";
import func from "../../common/functions";
const { overAll, getCurrShift } = func;
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    marginTop: "2rem",
  },
  overall: {
    width: "100%",
  },
}));
export default function ToolBar(props) {
  const [overall, setOverAll] = React.useState({});
  const [shift, setShift] = React.useState("");
  const classes = useStyles();

  React.useEffect(() => {
    overAll((err, data) => {
      if (!err) {
        setOverAll(data);
      }
    });

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    getCurrShift((err, res) => {
      if (err) setShift("Error Connecting to server");
      else setShift(res);
    });
    let interval = setInterval(() => {
      getCurrShift((err, res) => {
        if (err) setShift("Error Connecting to server");
        else setShift(res);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.container}>
      <div>Shift : {shift}</div>
      <div className={classes.overall}>
        <OverAll overall={overall} setOverAll={setOverAll} />
      </div>
    </div>
  );
}
