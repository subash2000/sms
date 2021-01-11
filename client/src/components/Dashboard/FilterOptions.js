import React from "react";
import { makeStyles } from "@material-ui/styles";
import TextSelct from "./TextSelect";
import CountSelect from "./CountSelect";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "1rem",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minWidth: "400px",
  },
  checkbox: {
    minWidth: "180px",
  },
}));
export default function FilterOptions(props) {
  const [departments, setDepartments] = React.useState([]);
  const [counts, setCounts] = React.useState([]);
  const [models, setModels] = React.useState([]);
  const [department, setDepartment] = React.useState(props.department);
  const [count, setCount] = React.useState(props.count);
  const [model, setModel] = React.useState(props.model);

  const classes = useStyles();

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/departments")
      .then((res) => {
        setDepartments([...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/models")
      .then((res) => {
        setModels([...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/count")
      .then((res) => {
        setCounts([...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className={classes.container}>
      <TextSelct
        label="Department"
        variant="outlined"
        required={true}
        value={department}
        onChange={(e) => {
          props.setDepartment(e.target.value);
          setDepartment(e.target.value);
        }}
        menuItems={departments}
      />
      <TextSelct
        label="Model"
        variant="outlined"
        required={true}
        value={model}
        onChange={(e) => {
          props.setModel(e.target.value);
          setModel(e.target.value);
        }}
        menuItems={models}
      />
      <CountSelect
        label="Count"
        variant="outlined"
        required={true}
        value={count}
        onChange={(e) => {
          props.setCount(e.target.value);
          setCount(e.target.value);
        }}
        menuItems={counts}
      />
    </div>
  );
}
