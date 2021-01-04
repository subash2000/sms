import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import axios from "axios";
import Alert from "../../utilities/Alert";
import FormText from "../../utilities/TextField";
import SubmitBtn from "../../utilities/SubmitBtn";
import AvailableCounts from "./AvailableCount";
import CircularProgress from "../../utilities/CircularProgress";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "70%",
  },
  textField: {
    margin: "1rem 0",
    width: "100%",
  },
  btn: {
    //width: "50%",
    margin: "2rem 0",
  },
  btnDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  err: {
    textAlign: "center",
    width: "100%",
    marginTop: "2rem",
    padding: "2rem",
    color: "red",
  },
}));

export default function Count() {
  const [unit, setUnit] = React.useState("Nec");
  const [value, setValue] = React.useState("");
  const [alert, setAlert] = React.useState(undefined);
  const classes = useStyles();
  const [counts, setCounts] = React.useState([]);
  const [content, setContent] = React.useState(undefined);
  const [progress, setProgress] = React.useState(false);
  const [submitProgress, setSubmitProgress] = React.useState(false);

  const noCounts = (
    <Paper elevation={3} className={classes.err}>
      <Typography variant="body1">No counts Available</Typography>
    </Paper>
  );

  const update = () => {
    setProgress(true);
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/count")
      .then((res) => {
        setCounts([...res.data.data]);
        setProgress(false);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
        setCounts([]);
        setProgress(false);
      });
  };

  React.useEffect(() => {
    if (counts.length <= 0) {
      setContent(noCounts);
    } else {
      setContent(
        <AvailableCounts
          alert={alert}
          setAlert={setAlert}
          counts={counts}
          update={update}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counts]);

  React.useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAlreadyExists = (arr, obj, cb) => {
    let stringified = JSON.stringify(obj);
    let duplicate = false;
    let p1 = arr.map((item) => {
      if (JSON.stringify(item) === stringified) duplicate = true;

      return item;
    });
    Promise.all([p1]).then(() => {
      if (duplicate) {
        cb({ msg: "Already Exists" }, null);
      } else {
        cb(null, obj);
      }
    });
  };

  const existHandler = (err, obj) => {
    if (err) {
      setAlert(<Alert msg="Count Already Exists" type="error" />);
      return;
    } else {
      setSubmitProgress(true);
      setAlert(undefined);
      axios
        .post(process.env.REACT_APP_BACKEND + "/api/settings/mill/count", {
          count: {
            ...obj,
          },
        })
        .then((res) => {
          setAlert(<Alert msg={res.data.msg} type="success" />);
          setSubmitProgress(false);
          update();
          setValue("");
          setUnit("Nec");
        })
        .catch((err) => {
          if (err.response) console.log(err.response.data);
          setAlert(
            <Alert
              msg="Cannot update count settings.Try again later"
              type="error"
            />
          );
          setSubmitProgress(false);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAlreadyExists(
      counts,
      {
        value,
        unit,
      },
      existHandler
    );
  };
  return (
    <div className={classes.container}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Count Settings
      </h2>
      <form onSubmit={handleSubmit}>
        <FormText
          type="text"
          label="unit"
          value={unit}
          variant="outlined"
          required={true}
          setVal={setUnit}
        />
        <FormText
          type="text"
          label="Count"
          value={value}
          variant="outlined"
          required={true}
          setVal={setValue}
        />
        {progress ? <CircularProgress /> : content}
        {alert}

        <SubmitBtn type="submit">
          {submitProgress ? (
            <CircularProgress size={30} color="secondary" />
          ) : (
            "Submit"
          )}
        </SubmitBtn>
      </form>
    </div>
  );
}
