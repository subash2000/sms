import React from "react";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "../../utilities/CheckBox";
import func from "../../../../common/functions";
const { parameters } = func;
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "1rem",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minWidth: "400px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  content: {
    minWidth: "180px",
  },
}));

export default function FilterParameter(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState({
    ...props.selected,
  });
  const handleChange = (e) => {
    let obj = { ...selected };
    obj[e.target.name] === undefined || obj[e.target.name] === true
      ? (obj[e.target.name] = false)
      : (obj[e.target.name] = true);
    setSelected(obj);
    props.setSelected(obj);
  };

  return (
    <div className={classes.container}>
      {parameters.map((item, i) => {
        return (
          <div key={i} className={classes.content}>
            <Checkbox
              checked={
                selected[item] === undefined || selected[item] === true
                  ? true
                  : false
              }
              name={item}
              handleChange={handleChange}
              label={item}
            />
          </div>
        );
      })}
    </div>
  );
}
