import React from "react";
import Modal from "../utilities/Modal";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IconButton } from "@material-ui/core";
import TextSelct from "../utilities/TextSelect";
import CountSelect from "../utilities/CountSelect";
import axios from "axios";
import propTypes from "prop-types";

export default function Filter(props) {
  const [open, setOpen] = React.useState(false);
  const [department, setDepartment] = React.useState("All");
  const [count, setCount] = React.useState("All");
  const [model, setModel] = React.useState("All");
  const [departments, setDepartments] = React.useState([]);
  const [counts, setCounts] = React.useState([]);
  const [models, setModels] = React.useState([]);

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

  const btnHandler = () => {
    setOpen(true);
  };
  const failureHandler = () => {
    setOpen(false);
  };
  const successHandler = () => {
    setOpen(false);

    props.setMachines([
      ...props.machines.filter((item) => {
        let dep = department === "All" || item.department === department;
        let mod = model === "All" || item.model === model;
        let c =
          count === "All" ||
          (item.count && count === item.count.value + item.count.unit);
        console.log(department, model, count);
        return dep && mod && c;
      }),
    ]);
  };
  return (
    <div>
      <IconButton onClick={btnHandler}>
        <FilterListIcon />
      </IconButton>
      <Modal
        open={open}
        failureHandler={failureHandler}
        successHandler={successHandler}
        title="Filter"
        success="Apply"
        failure="Cancel"
      >
        <div>
          <TextSelct
            label="Department"
            variant="outlined"
            required={true}
            value={department}
            onChange={(e) => {
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
              setCount(e.target.value);
            }}
            menuItems={counts}
          />
        </div>
      </Modal>
    </div>
  );
}
Filter.propTypes = {
  machines: propTypes.array.isRequired,
  setMachines: propTypes.func.isRequired,
};
