import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IconButton } from "@material-ui/core";
import Modal from "../utilities/Modal";
import Filter from "./Filter";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    // display: "flex",
    // width: "100%",
    // marginTop: "2rem",
    // justifyContent: "space-between",
  },
}));
export default function ToolBar(props) {
  const classes = useStyles();
  const [model, setModel] = React.useState(false);
  const { selected, setSelected } = props;
  const applyHandler = () => {
    let paramArr = Object.keys(selected).filter(
      (item) => selected[item] === true
    );
    props.setParameters(paramArr);
    localStorage.setItem("liveParameters", JSON.stringify(selected));
    setModel(false);
    window.location.reload();
  };

  const closeHandler = () => {
    setModel(false);
  };

  const filterBtnHandler = () => {
    setModel(true);
  };
  React.useEffect(() => {
    let cachedSelected = localStorage.getItem("liveParameters");
    if (cachedSelected) {
      setSelected(JSON.parse(cachedSelected));
    }
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    let paramArr = Object.keys(selected).filter(
      (item) => selected[item] === true
    );
    props.setParameters(paramArr);
    // eslint-disable-next-line
  }, [selected]);
  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <Modal
          title="Filter Machines"
          open={model}
          setOpen={setModel}
          success="Apply"
          failure="Cancel"
          successHandler={applyHandler}
          failureHandler={closeHandler}
        >
          <Filter
            parameters={props.parameters}
            setParameters={props.setParameters}
            selected={selected}
            setSelected={setSelected}
            setMachines={props.setMachines}
          />
        </Modal>
        <div className={classes.options}>
          <IconButton
            onClick={filterBtnHandler}
            color="primary"
            component="span"
          >
            <FilterListIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
