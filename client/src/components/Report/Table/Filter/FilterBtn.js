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
  const { selected, setSelected, cacheParam } = props;
  const applyHandler = () => {
    // let paramArr = Object.keys(selected).filter(
    //   (item) => selected[item] === true
    // );
    // console.log(selected);
    // props.setParameters(paramArr);
    // localStorage.setItem(cacheParam, JSON.stringify(selected));
    setModal(false);
  };

  const closeHandler = () => {
    setModal(false);
  };

  const filterBtnHandler = () => {
    setModal(true);
  };
  // React.useEffect(() => {
  //   let cachedSelected = localStorage.getItem(cacheParam);
  //   if (cachedSelected) {
  //     setSelected(JSON.parse(cachedSelected));
  //   }
  //   // eslint-disable-next-line
  // }, []);
  // React.useEffect(() => {
  // let paramArr = Object.keys(selected).filter(
  //   (item) => selected[item] === true
  // );
  // props.setParameters(paramArr);
  //   // eslint-disable-next-line
  // }, [selected]);
  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <Modal
          title="Filter Machines"
          open={modal}
          setOpen={setModal}
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
