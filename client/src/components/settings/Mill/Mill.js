import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Alert from "../../utilities/Alert";
import FormText from "../../utilities/TextField";
import PageTitle from "../../utilities/PageTitle";
import CircularProgress from "../../utilities/CircularProgress";
import SubmitBtn from "../../utilities/SubmitBtn";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
}));

export default function Mill(props) {
  const [shift1Hr, setShift1Hr] = React.useState("");
  const [shift1Min, setShift1Min] = React.useState("");
  const [shift2Hr, setShift2Hr] = React.useState("");
  const [shift2Min, setShift2Min] = React.useState("");
  const [shift3Hr, setShift3Hr] = React.useState("");
  const [shift3Min, setShift3Min] = React.useState("");
  const [inputs, setInputs] = React.useState({});
  const [alert, setAlert] = React.useState(undefined);
  const [submitProgress, setSubmitProgress] = React.useState(false);
  const [load, setLoad] = React.useState(true);
  const classes = useStyles();

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill")
      .then((res) => {
        setInputs({
          ...res.data.result,
        });
        setShift1Hr(res.data.result.shift1Hr.toString());
        setShift1Min(res.data.result.shift1Min.toString());
        setShift2Hr(res.data.result.shift2Hr.toString());
        setShift2Min(res.data.result.shift2Min.toString());
        setShift3Hr(res.data.result.shift3Hr.toString());
        setShift3Min(res.data.result.shift3Min.toString());
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        setAlert(<Alert type="warning" msg="Can't connect to server" />);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitProgress(true);
    axios
      .post(process.env.REACT_APP_BACKEND + "/api/settings/mill", {
        ...inputs,
        shift1Hr,
        shift1Min,
        shift2Hr,
        shift2Min,
        shift3Hr,
        shift3Min,
      })
      .then((res) => {
        setAlert(<Alert type="success" msg={res.data.msg} />);
        setSubmitProgress(false);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);

        setAlert(
          <Alert
            type="error"
            msg="Cannot update mill settings.Try again later"
          />
        );
        setSubmitProgress(false);
      });
  };
  return (
    <div className={classes.container}>
      <PageTitle text="Mill Settings" />
      {load ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <FormText
            required={true}
            label="Customer Name"
            variant="outlined"
            value={inputs.customer ? inputs.customer : ""}
            onChange={(e) => setInputs({ ...inputs, customer: e.target.value })}
          />
          <FormText
            required={true}
            type="email"
            label="Email"
            variant="outlined"
            value={inputs.email ? inputs.email : ""}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />

          <FormText
            required={true}
            type="number"
            inputProps={{ min: 1, max: 3 }}
            label="Number of Shifts"
            variant="outlined"
            value={inputs.shifts ? inputs.shifts : ""}
            onChange={(e) => setInputs({ ...inputs, shifts: e.target.value })}
          />

          <FormText
            required={true}
            disabled={inputs.shifts && inputs.shifts < 1}
            type="time"
            variant="outlined"
            label="Shift-1 Start Time"
            hr={shift1Hr}
            min={shift1Min}
            setHr={setShift1Hr}
            setMin={setShift1Min}
          />
          <FormText
            required={true}
            disabled={inputs.shifts && inputs.shifts < 2}
            type="time"
            variant="outlined"
            label="Shift-2 Start Time"
            hr={shift2Hr}
            min={shift2Min}
            setHr={setShift2Hr}
            setMin={setShift2Min}
          />
          <FormText
            required={true}
            disabled={inputs.shifts && inputs.shifts < 3}
            type="time"
            variant="outlined"
            label="Shift-3 Start Time"
            hr={shift3Hr}
            min={shift3Min}
            setHr={setShift3Hr}
            setMin={setShift3Min}
          />

          {alert}
          <SubmitBtn type="submit">
            {submitProgress ? (
              <CircularProgress size={25} color="secondary" />
            ) : (
              "Save"
            )}
          </SubmitBtn>
        </form>
      )}
    </div>
  );
}
