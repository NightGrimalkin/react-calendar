import React, { useEffect, useState } from "react";
import DayListElement from "./DayListElement";

function DayView(props) {
  const [tempNotes, setTempNotes] = useState({
    listElementInput: "",
    listHoursInput: "",
  });
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState([props.year, props.month, props.day]);

  function deleteListElement(e) {
    const index = e.target.getAttribute("indexed");
    let tempNotes = notes;
    tempNotes.splice(index, 1);
    setNotes([...tempNotes]);
  }

  const handleInputChange = (e) => {
    setTempNotes((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function addToList() {
    let tempTemporaryNotes = tempNotes;
    let temporaryNotes = notes;
    temporaryNotes.push({
      listElementInput: tempTemporaryNotes.listElementInput,
      listHoursInput: tempTemporaryNotes.listHoursInput,
      amount: 1,
    });
    setNotes(temporaryNotes);
    setTempNotes({
      listElementInput: "",
      listHoursInput: "",
    });
  }

  function addToLocalStorage() {
    notes.forEach((element) => {
      let event = {
        name: element.listElementInput,
        time: element.listHoursInput,
        year: date[0],
        month: date[1],
        day: date[2],
      };
      localStorage.setItem(notes.listElementInput+": "+date[0]+"-"+date[1]+"-"+date[2],JSON.stringify(event));
      setNotes([]);
    });
  }
  function returnList() {
    const listToReturn = notes.map((value, index) => {
      return (
        <li key={index}>
          {" "}
          <DayListElement
            del={deleteListElement}
            number={index}
            index={index + 1}
            text={value.listElementInput}
            time={value.listHoursInput}
          />
        </li>
      );
    });
    return <ul>{listToReturn}</ul>;
  }

  return (
    <div>
      <input
        placeholder="Przedmiot:"
        type="text"
        name="listElementInput"
        onChange={handleInputChange}
        value={tempNotes.listElementInput}
      />
      <input
        placeholder="Godziny:"
        type="text"
        name="listHoursInput"
        onChange={handleInputChange}
        value={tempNotes.listHoursInput}
      />
      <button onClick={addToList}>Dodaj</button>

      <div>{returnList()}</div>
      <button onClick={addToLocalStorage}>Zapisz</button>
    </div>
  );
}

export default DayView;
