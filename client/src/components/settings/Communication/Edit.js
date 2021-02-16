import React from "react";
import axios from "axios";
import Alert from "../../utilities/Alert";
import FormText from "../../utilities/TextField";
import CircularProgress from "../../utilities/CircularProgress";
import SubmitBtn from "../../utilities/SubmitBtn";

export default function Single(props) {
  const [inputs, setInputs] = React.useState({
    machine: props.data.machine,
    department: props.data.department,
    model: props.data.model,
    backRollerDia: props.data.backRollerDia,
    backRollerPpr: props.data.backRollerPpr,
    backRollerRpm: props.data.backRollerRpm,
    deliveryRollerDia: props.data.deliveryRollerDia,
    deliveryRollerPpr: props.data.deliveryRollerPpr,
    deliveryRollerRpm: props.data.deliveryRollerRpm,
    middleRollerDia: props.data.middleRollerDia,
    middleRollerPpr: props.data.middleRollerPpr,
    middleRollerRpm: props.data.middleRollerRpm,
    shed: props.data.shed,
    tinRollerPpr: props.data.tinRollerPpr,
    tinRollerRpm: props.data.tinRollerRpm,
    spindles: props.data.spindles,
    id: props.data.id,
  });
  const [alert, setAlert] = React.useState(undefined);
  const [submitProgress, setSubmitProgress] = React.useState(false);

  const handleSubmit = (e) => {
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
        setSubmitProgress(false);
        setAlert(<Alert type="success" msg="Updated Successfully" />);
        console.log(res.data);
        props.update();
      })
      .catch((err) => {
        setSubmitProgress(false);
        console.log(err.response);
        if (err.response && err.response.data)
          setAlert(<Alert type="error" msg={err.response.data.msg} />);
        else
          setAlert(<Alert type="error" msg="Update Failed Try again later" />);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormText
          required={true}
          label="Machine Number"
          variant="outlined"
          type="number"
          value={inputs.machine ? inputs.machine : ""}
          onChange={(e) => setInputs({ ...inputs, machine: e.target.value })}
          disabled={true}
        />
        <FormText
          label="Department"
          variant="outlined"
          required={true}
          value={inputs.department ? inputs.department : ""}
          onChange={(e) => setInputs({ ...inputs, department: e.target.value })}
          disabled={true}
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
