import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import axios from "axios";
import Alert from "../../utilities/Alert";
import FormText from "../../utilities/TextField";
import SubmitBtn from "../../utilities/SubmitBtn";
import AvailableModels from "./AvailableModals";
import PageTitle from "../../utilities/PageTitle";
import CircularProgress from "../../utilities/CircularProgress";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
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
  available: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Modal() {
  const [value, setValue] = React.useState("");
  const [alert, setAlert] = React.useState(undefined);
  const classes = useStyles();
  const [models, setModels] = React.useState([]);
  const [content, setContent] = React.useState(undefined);
  const [progress, setProgress] = React.useState(false);
  const [submitProgress, setSubmitProgress] = React.useState(false);

  const noModels = (
    <Paper elevation={3} className={classes.err}>
      <Typography variant="body1">No Models Available</Typography>
    </Paper>
  );

  const update = () => {
    setProgress(true);
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/models")
      .then((res) => {
        setModels([...res.data.data]);
        setProgress(false);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
        setModels([]);
        setProgress(false);
      });
  };

  React.useEffect(() => {
    if (models.length <= 0) {
      setContent(noModels);
    } else {
      setContent(
        <AvailableModels
          alert={alert}
          setAlert={setAlert}
          models={models}
          update={update}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models]);

  React.useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAlreadyExists = (arr, val, cb) => {
    let duplicate = false;
    let p1 = arr.map((item) => {
      if (item === val) {
        duplicate = true;
      }
      return item;
    });
    Promise.all([p1]).then(() => {
      if (duplicate) {
        cb({ msg: "Already Exists" }, null);
      } else {
        cb(null, val);
      }
    });
  };

  const existHandler = (err, val) => {
    if (err) {
      setAlert(<Alert msg="Model Already Exists" type="error" />);
      return;
    } else {
      setSubmitProgress(true);
      setAlert(undefined);
      axios
        .post(process.env.REACT_APP_BACKEND + "/api/settings/mill/model", {
          model: val,
        })
        .then((res) => {
          setAlert(<Alert msg={res.data.msg} type="success" />);
          setSubmitProgress(false);
          update();
          setValue("");
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data);
          setAlert(
            <Alert msg="Cannot update model.Try again later" type="error" />
          );
          setSubmitProgress(false);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAlreadyExists(models, value, existHandler);
  };
  return (
    <div className={classes.container}>
      <PageTitle text="Edit Models" />
      <form onSubmit={handleSubmit}>
        <FormText
          type="text"
          label="Model"
          value={value}
          variant="outlined"
          required={true}
          setVal={setValue}
        />

        <SubmitBtn type="submit">
          {submitProgress ? (
            <CircularProgress size={30} color="secondary" />
          ) : (
            "Submit"
          )}
        </SubmitBtn>
        <div className={classes.available}>
          {progress ? <CircularProgress /> : content}
        </div>
        {alert}
      </form>
    </div>
  );
}
