import React from "react";
import axios from "axios";
import Alert from "../../utilities/Alert";
import FormText from "../../utilities/TextField";
import CircularProgress from "../../utilities/CircularProgress";
import SubmitBtn from "../../utilities/SubmitBtn";

export default function Single() {
  const [inputs, setInputs] = React.useState({});
  const [alert, setAlert] = React.useState(undefined);
  const [submitProgress, setSubmitProgress] = React.useState(false);
  const handleSubmit = (e) => {
    setAlert(undefined);
    e.preventDefault();
    setSubmitProgress(true);

    axios
      .post(
        process.env.REACT_APP_BACKEND + "/api/settings/communication/single",
        {
          ...inputs,
        }
      )
      .then((res) => {
        if (res.data.response && res.data.response.nModified) {
          setSubmitProgress(false);
          setAlert(<Alert type="success" msg="Updated Successfully" />);
          setInputs({});
        } else {
          setAlert(
            <Alert type="error" msg="No machines found.Check Machine No/dept" />
          );
          setSubmitProgress(false);
        }

        console.log(res.data);
      })
      .catch((err) => {
        setAlert(<Alert type="error" msg="Update Failed Try again later" />);
        setSubmitProgress(false);
        if (err.response) console.log(err.response.data);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <FormText
          required={true}
          label="Machine Number"
          variant="outlined"
          type="number"
          value={inputs.machine ? inputs.machine : ""}
          onChange={(e) => setInputs({ ...inputs, machine: e.target.value })}
        />
        <FormText
          required={true}
          label="Department"
          variant="outlined"
          value={inputs.department ? inputs.department : ""}
          onChange={(e) => setInputs({ ...inputs, department: e.target.value })}
        />
        <FormText
          required={true}
          label="Module ID"
          variant="outlined"
          type="number"
          value={inputs.id ? inputs.id : ""}
          onChange={(e) => setInputs({ ...inputs, id: e.target.value })}
        />

        {alert}
        <SubmitBtn type="submit">
          {submitProgress ? (
            <CircularProgress size={25} color="secondary" />
          ) : (
            "Submit"
          )}
        </SubmitBtn>
      </form>
    </>
  );
}
