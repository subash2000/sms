import React from "react";
import Table from "./Table";
import Summary from "./Summary";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  summary: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  statusContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
  },
  status: {
    display: "flex",

    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
  },
  dot: {
    height: "15px",
    width: "15px",

    borderRadius: "50%",
    display: "inline-block",
  },
}));

export default function Print(props) {
  const classes = useStyles();

  React.useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const { machines, parameters } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2rem",
      }}
      className="section-to-print"
    >
      <h1>Company Name</h1>
      <Table parameters={parameters} result={machines} />
      <div className={classes.summary}>
        <Summary machines={machines} />
      </div>
    </div>
  );
}
