import React from "react";
import GaugeChart from "react-d3-speedometer";
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {},
  heading: {
    textAlign: "center",
  },
}));
export default function Chart({ value, maxValue, label, minValue }) {
  const theme = useTheme();
  value = parseInt(value);

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{label}</h2>
      <GaugeChart
        maxValue={maxValue}
        value={value}
        needleColor="red"
        segments={5}
        endColor={theme.palette.primary.light}
        startColor={theme.palette.secondary.dark}
        textColor="#111"
        height={250}
        width={250}
        minValue={minValue}
      />
    </div>
  );
}
