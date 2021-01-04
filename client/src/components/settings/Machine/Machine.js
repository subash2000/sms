import React from "react";
import Single from "./Single";
import Multiple from "./Multiple";
import { makeStyles } from "@material-ui/styles";
import Breadcrumb from "../../utilities/Breadcrumb";
import PageTitle from "../../utilities/PageTitle";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  paper: {
    padding: "2rem",
  },
}));
export default function Machine() {
  const [main, setMain] = React.useState(<Single />);
  const classes = useStyles();
  const items = [
    {
      component: <Single />,
      title: "Single",
    },
    {
      component: <Multiple />,
      title: "Multiple",
    },
  ];
  return (
    <div className={classes.container}>
      <PageTitle text="Add Machine(s)" />
      <Breadcrumb setMain={setMain} items={items} />
      {main}
    </div>
  );
}
