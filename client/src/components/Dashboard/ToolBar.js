import React from "react";
import { makeStyles } from "@material-ui/styles";
import OverAll from "./OverAll";
import func from "../../common/functions";
const { getCurrShift } = func;
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    marginTop: "1rem",
    display: "flex",
  },
  overall: {
    width: "100%",
  },
  form: {
    width: "25%",
    marginRight: "1rem",
  },
}));
export default function ToolBar(props) {
  const [shift, setShift] = React.useState("");
  const classes = useStyles();

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
      <div className={classes.overall}>
        <OverAll machines={props.machines} shift={shift} />
      </div>
    </div>
  );
}
