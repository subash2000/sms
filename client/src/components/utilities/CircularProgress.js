import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
}));

export default function CircularIndeterminate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        className={classes.progress}
        color={props.color ? props.color : "primary"}
        size={props.size ? props.size : 40}
      />
    </div>
  );
}
