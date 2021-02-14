import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));
export default function ToolBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button onClick={props.onClick} variant="contained" color="primary">
        Add
        <AddIcon color="secondary" />
      </Button>
    </div>
  );
}
