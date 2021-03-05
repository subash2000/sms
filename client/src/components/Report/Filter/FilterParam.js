import { IconButton, Tooltip, makeStyles } from "@material-ui/core";
import React from "react";
import Modal from "../../utilities/Modal";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TransferList from "./TransferList";

const useStyles = makeStyles((theme) => ({
  btn: {
    minHeight: "100px",
  },
}));
export default function FilterParam({ setParameters, parameters, cache }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const successHandler = () => {
    setOpen(false);
  };
  const failureHandler = () => {
    setOpen(false);
  };
  const btnHandler = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Modal
        successHandler={successHandler}
        failureHandler={failureHandler}
        failure="Cancel"
        title="Filter Parameters"
        open={open}
      >
        <TransferList
          cache={cache}
          parameters={parameters}
          setParameters={setParameters}
        />
      </Modal>
      <Tooltip title="Parameters">
        <IconButton
          size="medium"
          variant="contained"
          color="primary"
          onClick={btnHandler}
        >
          <ListAltIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
