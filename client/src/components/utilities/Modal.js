import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

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
          {props.success ? (
            <Button autoFocus onClick={props.successHandler} color="primary">
              {props.success}
            </Button>
          ) : undefined}
          {props.failure ? (
            <Button autoFocus onClick={props.failureHandler} color="primary">
              {props.failure}
            </Button>
          ) : undefined}
        </DialogActions>
      </Dialog>
    </div>
  );
}

ResponsiveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  failureHandler: PropTypes.func.isRequired,
  successHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
