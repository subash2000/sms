import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "2rem 0",
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
  btnDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
}));

export default function SubmitBtn(props) {
  const classes = useStyles();
  return (
    <div className={classes.btnDiv}>
      <Button
        className={classes.btn}
        type={props.type ? props.type : "button"}
        variant={props.variant ? props.variant : "contained"}
        color={props.color ? props.color : "primary"}
      >
        {props.children}
      </Button>
    </div>
  );
}
