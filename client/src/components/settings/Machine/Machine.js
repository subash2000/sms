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
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = React.useState({});
  const [inputsMultiple, setInputsMultiple] = React.useState({});
  const [main, setMain] = React.useState(undefined);

  React.useEffect(() => {
    setMain(<Multiple inputs={inputsMultiple} setInputs={setInputsMultiple} />);
  }, [inputsMultiple]);

  React.useEffect(() => {
    setMain(<Single inputs={inputs} setInputs={setInputs} />);
  }, [inputs]);

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
      component: <Single inputs={inputs} setInputs={setInputs} />,
      title: "Single",
    },
    {
      component: (
        <Multiple inputs={inputsMultiple} setInputs={setInputsMultiple} />
      ),
      title: "Multiple",
    },
  ];
  return (
    <div className={classes.wrap}>
      <PageTitle text="Machine Settings" />
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
