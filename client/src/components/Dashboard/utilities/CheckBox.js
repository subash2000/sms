import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxLabels(props) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checked}
            onChange={props.handleChange}
            name={props.name}
          />
        }
        label={props.label}
      />
    </FormGroup>
  );
}
