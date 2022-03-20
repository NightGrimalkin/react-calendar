import React from "react";

function Day(props) {
  return (
    <div onClick={props.controlingFunctionDay} dayval={props.dayval}>
      <p className="singleDay">{props.day}</p>
    </div>
  );
}

export default Day;
