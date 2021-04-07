import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    minWidth: "500px",
  },
}));

export default function ResponsiveDialog(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.failureHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
        <DialogContent className={classes.container} dividers>
          {props.children}
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={props.successHandler} color="primary">
            {props.success}
          </Button> */}
          <Button onClick={props.failureHandler} color="primary" autoFocus>
            {props.failure}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
