import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import FormSelect from "../../utilities/FormSelect";
import SubmitBtn from "../../utilities/SubmitBtn";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "3rem",
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

export default function Count(props) {
  const [count, setCount] = React.useState("");
  const classes = useStyles();
  const [menuItems, setMenuItems] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/count")
      .then((res) => {
        setMenuItems([...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
        console.log(err);
        setMenuItems([]);
      });

    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let countobj = JSON.parse(count);

    axios
      .post(process.env.REACT_APP_BACKEND + "/api/settings/machines/setcount", {
        value: countobj.value,
        unit: countobj.unit,
        filter: props.selected.map((item) => JSON.parse(item)),
      })
      .then((res) => {
        props.closeModel();
        props.setSnack(true);
        props.setSnackMsg("Updated Successfully");
        props.updateMachines();
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
        console.log(err);
        props.closeModel();
        props.setSnack(true);
        props.setSnackMsg("Update Failed");
      });
  };
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <FormSelect
          label="Count"
          variant="outlined"
          required={true}
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
          menuItems={menuItems}
        />

        <SubmitBtn type="submit">Submit</SubmitBtn>
      </form>
    </div>
  );
}
