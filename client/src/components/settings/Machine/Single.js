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
    e.preventDefault();
    setSubmitProgress(true);
    axios
      .post(process.env.REACT_APP_BACKEND + "/api/machines/single/insert", {
        ...inputs,
      })
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
          label="Shed Number"
          variant="outlined"
          type="number"
          value={inputs.shed ? inputs.shed : ""}
          onChange={(e) => setInputs({ ...inputs, shed: e.target.value })}
        />
        <FormText
          required={true}
          label="Machine Model"
          variant="outlined"
          value={inputs.model ? inputs.model : ""}
          onChange={(e) => setInputs({ ...inputs, model: e.target.value })}
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
