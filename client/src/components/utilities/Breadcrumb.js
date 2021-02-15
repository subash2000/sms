import React from "react";
import { Breadcrumbs, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
}));

export default function SimpleBreadcrumbs(props) {
  const classes = useStyles();
  const [curr, setCurr] = React.useState(0);

  React.useEffect(() => {
    props.setMain(props.items[0].component);
    // eslint-disable-next-line
  }, []);
  return (
    <Breadcrumbs className={classes.container} aria-label="breadcrumb">
      {props.items.map((item, i) => {
        return (
          <Button
            key={i}
            variant={curr === i ? "contained" : "text"}
            color="primary"
            onClick={() => {
              props.setMain(item.component);
              setCurr(i);
            }}
          >
            {item.title}
          </Button>
        );
      })}
    </Breadcrumbs>
  );
}
