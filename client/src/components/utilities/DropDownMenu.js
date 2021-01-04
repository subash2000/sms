import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    width: "100%",
    background: "transparent",
    color: "#fff",
    padding: "0.5rem 0",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    width: "100%",
    display: "block",
    padding: "1rem 2rem",
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="secondary" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body1" className={classes.heading}>
          {props.title}
        </Typography>
      </AccordionSummary>

      {props.content.map((text, i) => {
        return (
          <Link
            key={i}
            className={classes.link}
            to={text.split(" ").join("").toLowerCase()}
          >
            {text}
          </Link>
        );
      })}
    </Accordion>
  );
}
