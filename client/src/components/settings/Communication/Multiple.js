import React from "react";
import axios from "axios";
import Alert from "../../utilities/Alert";
import FormText from "../../utilities/TextField";
import CircularProgress from "../../utilities/CircularProgress";
import SubmitBtn from "../../utilities/SubmitBtn";

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

async function toArr(from, to, obj) {
  console.log(from, to, obj);
  let machinesArr = [];
  for (let i = from; i <= to; i++) {
    machinesArr.push({
      ...obj,
      machine: i,
    });
  }
  return machinesArr;
}

export default function Single() {
  const [inputs, setInputs] = React.useState({});
  const [alert, setAlert] = React.useState(undefined);
  const [submitProgress, setSubmitProgress] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitProgress(true);
    let result = await toArr(
      inputs.from,
      inputs.to,
      _objectWithoutProperties(inputs, ["from", "to"])
    );
    axios
      .post(
        process.env.REACT_APP_BACKEND + "/api/settings/communication/multiple",
        {
          ...inputs,
        }
      )
      .then((res) => {
        setSubmitProgress(false);
        setAlert(<Alert type="success" msg="Updated Successfully" />);
        setInputs({});
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
          label="Machine Number(From)"
          variant="outlined"
          type="number"
          value={inputs.from ? inputs.from : ""}
          onChange={(e) => setInputs({ ...inputs, from: e.target.value })}
        />
        <FormText
          required={true}
          label="Machine Number(To)"
          variant="outlined"
          type="number"
          value={inputs.to ? inputs.to : ""}
          onChange={(e) => setInputs({ ...inputs, to: e.target.value })}
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
          label="Module ID(From)"
          variant="outlined"
          type="number"
          value={inputs.fromId ? inputs.fromId : ""}
          onChange={(e) => setInputs({ ...inputs, fromId: e.target.value })}
        />
        <FormText
          required={true}
          label="Module ID(To)"
          variant="outlined"
          type="number"
          value={inputs.toId ? inputs.toId : ""}
          onChange={(e) => setInputs({ ...inputs, toId: e.target.value })}
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
