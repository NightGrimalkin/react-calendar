import React from "react";

function DayListElement(props) {
  return (
    <div className="DayListElement" >
      <p>Aktywność: {props.text} &nbsp;</p>
      <p>Godziny: {props.time} &nbsp;</p>
      <button onClick={props.del} indexed={props.number}>
        delete
      </button>
    </div>
  );
}

export default DayListElement;