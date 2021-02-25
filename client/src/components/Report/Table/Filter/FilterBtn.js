import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IconButton, Tooltip } from "@material-ui/core";
import Modal from "../../../utilities/Modal";
import Filter from "./FilterParameter";
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
  const [modal, setModal] = React.useState(false);
  const { cacheParam } = props;
  const applyHandler = () => {
    // let paramArr = Object.keys(selected).filter(

    setModal(false);
  };

  const closeHandler = () => {
    setModal(false);
  };

  const filterBtnHandler = () => {
    setModal(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <Modal
          title="Filter Machines"
          open={modal}
          setOpen={setModal}
          failure="Cancel"
          successHandler={applyHandler}
          failureHandler={closeHandler}
        >
          <Filter
            parameters={props.parameters}
            setParameters={props.setParameters}
            cacheParam={cacheParam}
          />
        </Modal>
        <div className={classes.options}>
          <Tooltip title="Filter" placement="top">
            <IconButton
              onClick={filterBtnHandler}
              color="primary"
              component="span"
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
