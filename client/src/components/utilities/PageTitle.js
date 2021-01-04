import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "2rem 0",
    textAlign: "center",
  },
}));
export default function PageTitle(props) {
  const classes = useStyles();
  return (
    <h1 className={classes.heading} color="primary">
      {props.text}
    </h1>
  );
}
