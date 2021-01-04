import React from "react";
import { emphasize, withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import FilterParam from "./FilterParameter";
import FilterOpt from "./FilterOptions";
const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function CustomizedBreadcrumbs(props) {
  const [content, setContent] = React.useState(
    <FilterParam
      parameters={props.parameters}
      setParameters={props.setParameters}
      selected={props.selected}
      setSelected={props.setSelected}
    />
  );
  const options = {
    parameter: (
      <FilterParam
        parameters={props.parameters}
        setParameters={props.setParameters}
        selected={props.selected}
        setSelected={props.setSelected}
      />
    ),
    options: <FilterOpt />,
  };
  function handleClick(event, type) {
    event.preventDefault();
    setContent(options[type]);
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          label="Parameter"
          onClick={(e) => handleClick(e, "parameter")}
        />
        <StyledBreadcrumb
          label="Machine attributes"
          onClick={(e) => handleClick(e, "options")}
        />
      </Breadcrumbs>
      {content}
    </div>
  );
}
