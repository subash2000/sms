import React from "react";
// import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
// import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.1rem",
    margin: "1rem",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  label: {
    display: "flex",
    width: "100%",

    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
    },
  },
  colon: {
    textAlign: "center",
    marginRight: "2rem",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0",
    },
  },
  text: {
    textAlign: "left",
  },
  labelText: {
    textAlign: "right",
    marginRight: "2rem",
    [theme.breakpoints.down("xs")]: {
      marginRight: "2rem",
    },
  },
  textField: {
    width: "100%",
  },
}));

export default function TextFieldEdit(props) {
  const classes = useStyles();
  const [edit, setEdit] = React.useState(false);
  let content = undefined;

  //   const editHandler = () => {
  //     setEdit(true);
  //   };
  const saveHandler = () => {
    setEdit(false);
  };

  const cancelHandler = () => {
    setEdit(false);
  };
  if (edit) {
    content = (
      <div>
        input
        <CheckCircleIcon onClick={saveHandler} />
        <CancelIcon onClick={cancelHandler} />
      </div>
    );
  } else {
    content = <div>Diplay</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <p className={classes.labelText}>
          {props.label.charAt(0).toUpperCase() + props.label.slice(1)}
        </p>
        <p className={classes.colon}>:</p>
      </div>
      {content}
    </div>
  );
}
