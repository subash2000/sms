import React from "react";
import Single from "./Single";
import Multiple from "./Multiple";
import { makeStyles } from "@material-ui/styles";
import Breadcrumb from "../../utilities/Breadcrumb";
import PageTitle from "../../utilities/PageTitle";
import Modal from "../../utilities/Modal";
import Table from "./Table";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  paper: {
    padding: "2rem",
  },
  wrap: {
    width: "100%",
  },
}));
export default function Machine() {
  const [main, setMain] = React.useState(<Single />);
  const [open, setOpen] = React.useState(false);

  const successHandler = () => {
    setOpen(false);
  };
  const failureHandler = () => {
    setOpen(false);
    window.location.reload();
  };

  const addHandler = () => {
    setOpen(true);
  };

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
    <div className={classes.wrap}>
      <PageTitle text="Communication Settings" />
      <Table onClick={addHandler} />
      <Modal
        title="Add Machines"
        successHandler={successHandler}
        failureHandler={failureHandler}
        open={open}
        failure="Close"
      >
        <div className={classes.container}>
          <Breadcrumb setMain={setMain} items={items} />
          {main}
        </div>
      </Modal>
    </div>
  );
}
