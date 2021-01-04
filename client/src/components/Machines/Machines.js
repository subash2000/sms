import React from "react";
import useStyles from "./classes";
import TextFieldEdit from "../utilities/TextFieldEdit";

export default function Machines() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Machines</h2>
      <div className={classes.container}>
        <TextFieldEdit label="boom" value={"boom"} />
      </div>
    </div>
  );
}
