import React from "react";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "./CheckBox";
import funcs from "../../../common/functions";
import { Divider } from "@material-ui/core";

const { getNames, getSheds, getTypes } = funcs;

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
export default function FilterOptions() {
  const [sheds, setSheds] = React.useState([]);
  const [names, setNames] = React.useState([]);
  const [types, setTypes] = React.useState([]);

  const [selected, setSelected] = React.useState({
    names: [],
    types: [],
    sheds: [],
  });

  const classes = useStyles();

  React.useEffect(() => {
    getTypes((err, data) => {
      if (!err) {
        setTypes(data.types);
      }
    });
    getNames((err, data) => {
      if (!err) {
        setNames(data.names);
      }
    });
    getSheds((err, data) => {
      if (!err) {
        setSheds(data.sheds);
      }
    });
    let cachedFilter = localStorage.getItem("countFilter");

    if (cachedFilter) {
      let filters = { ...JSON.parse(cachedFilter) };
      setSelected(filters);
    }
    console.log(cachedFilter);

    // eslint-disable-next-line
  }, []);

  const handleChange = (e, type, data) => {
    let filters = [...selected[type]];
    if (e.target.checked && filters.indexOf(data) === -1) {
      filters.push(data);
    } else if (!e.target.checked && filters.indexOf(data) !== -1) {
      filters.splice(filters.indexOf(data), 1);
    }
    setSelected({ ...selected, [type]: filters });
  };
  const handleAllSheds = (e) => {
    if (e.target.checked) setSelected({ ...selected, sheds });
  };
  const handleAllNames = (e) => {
    if (e.target.checked) setSelected({ ...selected, names });
  };
  const handleAllTypes = (e) => {
    if (e.target.checked) setSelected({ ...selected, types });
  };
  React.useEffect(() => {
    localStorage.setItem("countFilter", JSON.stringify(selected));
  }, [selected]);
  return (
    <div className={classes.container}>
      <div className={classes.type}>
        <h4>Sheds</h4>
        <div className={classes.content}>
          <Checkbox
            checked={selected["sheds"].length === sheds.length}
            name="All"
            handleChange={handleAllSheds}
            label="All"
          />
          {sheds.sort().map((item, i) => {
            console.log(item);
            return (
              <div key={i} className={classes.checkbox}>
                <Checkbox
                  checked={
                    selected["sheds"].indexOf(item) !== -1 ? true : false
                  }
                  handleChange={(e) => handleChange(e, "sheds", item)}
                  label={item}
                />
              </div>
            );
          })}
        </div>
        <Divider />
      </div>
      <div className={classes.type}>
        <h4>Machine names</h4>
        <div className={classes.content}>
          <Checkbox
            checked={selected["names"].length === names.length}
            name="All"
            handleChange={handleAllNames}
            label="All"
          />
          {names.sort().map((item, i) => {
            return (
              <div key={i} className={classes.checkbox}>
                <Checkbox
                  checked={
                    selected["names"].indexOf(item) !== -1 ? true : false
                  }
                  handleChange={(e) => handleChange(e, "names", item)}
                  label={item}
                />
              </div>
            );
          })}
        </div>

        <Divider />
      </div>
      <div className={classes.type}>
        <h4>Machine Types</h4>
        <div className={classes.content}>
          <Checkbox
            checked={selected["types"].length === types.length}
            name="All"
            handleChange={handleAllTypes}
            label="All"
          />
          {types.sort().map((item, i) => {
            return (
              <div key={i} className={classes.checkbox}>
                <Checkbox
                  checked={
                    selected["types"].indexOf(item) !== -1 ? true : false
                  }
                  handleChange={(e) => handleChange(e, "types", item)}
                  label={item}
                />
              </div>
            );
          })}
        </div>

        <Divider />
      </div>
    </div>
  );
}
