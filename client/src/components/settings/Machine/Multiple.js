import React from "react";
import axios from "axios";
import Alert from "../../utilities/Alert";
import FormText from "../../utilities/TextField";
import CircularProgress from "../../utilities/CircularProgress";
import SubmitBtn from "../../utilities/SubmitBtn";
import FormSelect from "../../utilities/FormSelect";

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
  const [models, setModels] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/models")
      .then((res) => {
        setModels([...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/departments")
      .then((res) => {
        setDepartments([...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
    // eslint-disable-next-line
  }, []);

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
        process.env.REACT_APP_BACKEND +
          "/api/settings/machines/multiple/insert",
        {
          machinesArr: result,
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
          label="Shed Number"
          variant="outlined"
          type="number"
          value={inputs.shed ? inputs.shed : ""}
          onChange={(e) => setInputs({ ...inputs, shed: e.target.value })}
        />
        <FormSelect
          label=" Machine Model"
          variant="outlined"
          required={true}
          value={inputs.model ? inputs.model : ""}
          onChange={(e) => setInputs({ ...inputs, model: e.target.value })}
          menuItems={models}
        />
        <FormSelect
          label="Department"
          variant="outlined"
          required={true}
          value={inputs.department ? inputs.department : ""}
          onChange={(e) => setInputs({ ...inputs, department: e.target.value })}
          menuItems={departments}
        />

        <FormText
          required={true}
          label="No of Spindles/Delivery"
          variant="outlined"
          type="number"
          value={inputs.spindles ? inputs.spindles : ""}
          onChange={(e) => {
            setInputs({ ...inputs, spindles: e.target.value });
          }}
        />

        <FormText
          required={true}
          label="Delivery Roller Diameter(mm)"
          variant="outlined"
          type="number"
          value={inputs.deliveryRollerDia ? inputs.deliveryRollerDia : ""}
          onChange={(e) =>
            setInputs({ ...inputs, deliveryRollerDia: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Middle Roller Diameter(mm)"
          variant="outlined"
          type="number"
          value={inputs.middleRollerDia ? inputs.middleRollerDia : ""}
          onChange={(e) =>
            setInputs({ ...inputs, middleRollerDia: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Back Roller Diameter(mm)"
          variant="outlined"
          type="number"
          value={inputs.backRollerDia ? inputs.backRollerDia : ""}
          onChange={(e) =>
            setInputs({ ...inputs, backRollerDia: e.target.value })
          }
        />
        <FormText
          required={true}
          label="No of teeth(Delivery Roller)"
          variant="outlined"
          type="number"
          value={inputs.deliveryRollerPpr ? inputs.deliveryRollerPpr : ""}
          onChange={(e) =>
            setInputs({ ...inputs, deliveryRollerPpr: e.target.value })
          }
        />
        <FormText
          required={true}
          label="No of teeth(Middle Roller)"
          variant="outlined"
          type="number"
          value={inputs.middleRollerPpr ? inputs.middleRollerPpr : ""}
          onChange={(e) =>
            setInputs({ ...inputs, middleRollerPpr: e.target.value })
          }
        />
        <FormText
          required={true}
          label="No of teeth(Back Roller)"
          variant="outlined"
          type="number"
          value={inputs.backRollerPpr ? inputs.backRollerPpr : ""}
          onChange={(e) =>
            setInputs({ ...inputs, backRollerPpr: e.target.value })
          }
        />
        <FormText
          required={true}
          label="No of teeth(Tin Roller)"
          variant="outlined"
          type="number"
          value={inputs.tinRollerPpr ? inputs.tinRollerPpr : ""}
          onChange={(e) =>
            setInputs({ ...inputs, tinRollerPpr: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Delivery Roller RPM Currection"
          variant="outlined"
          type="number"
          value={inputs.deliveryRollerRpm ? inputs.deliveryRollerRpm : ""}
          onChange={(e) =>
            setInputs({ ...inputs, deliveryRollerRpm: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Middle Roller RPM Currection"
          variant="outlined"
          type="number"
          value={inputs.middleRollerRpm ? inputs.middleRollerRpm : ""}
          onChange={(e) =>
            setInputs({ ...inputs, middleRollerRpm: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Back Roller RPM Currection"
          variant="outlined"
          type="number"
          value={inputs.backRollerRpm ? inputs.backRollerRpm : ""}
          onChange={(e) =>
            setInputs({ ...inputs, backRollerRpm: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Tin Roller RPM Currection"
          variant="outlined"
          type="number"
          value={inputs.tinRollerRpm ? inputs.tinRollerRpm : ""}
          onChange={(e) =>
            setInputs({ ...inputs, tinRollerRpm: e.target.value })
          }
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
