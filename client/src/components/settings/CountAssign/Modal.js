import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    minWidth: "500px",
  },
}));

export default function ResponsiveDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
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
