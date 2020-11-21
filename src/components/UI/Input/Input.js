import React from "react";
import FormControl from "react-bootstrap/FormControl";

const input = (props) => {
  return (
    <FormControl
      type="text"
      onChange={props.changed}
      value={props.inputValue}
      placeholder={props.placeholder}
    />
  );
};

export default input;
