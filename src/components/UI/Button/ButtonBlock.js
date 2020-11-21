import React from "react";
import Button from "react-bootstrap/Button";

const input = (props) => {
  return (
    <Button
      block
      type="text"
      size={props.size}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};

export default input;
