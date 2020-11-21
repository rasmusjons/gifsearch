import React from "react";
import Image from "react-bootstrap/Image";
import classes from "./Gif.module.css";

const gif = (props) => {
  return (
    <div>
      <Image
        src={props.src}
        rounded
        fluid
        className={[classes.gif, "pt-1 pb-1"].join(" ")}
      />
    </div>
  );
};

export default gif;
