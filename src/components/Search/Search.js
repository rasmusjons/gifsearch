import React from "react";
import Input from "../UI/Input/Input";

const search = (props) => {
  return (
    <div>
      <Input
        changed={props.inputChange}
        inputValue={props.input}
        placeholder={"Enter searchwords to find gif..."}
      />
    </div>
  );
};

export default search;
