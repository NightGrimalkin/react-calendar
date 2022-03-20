import React, { useMemo, useEffect, useState } from "react";
import DayListElement from "./DayListElement";

function DayView(props) {
  const [tempNotes, setTempNotes] = useState({
    listElementInput: "",
    listHoursInput: "",
  });
  const [notes, setNotes] = useState([]);

  const memoizedLSArray = useMemo(() => returnArrayOfLocalStorage(), [localStorage.length]);

  function deleteListElement(e) {
    const index = e.target.getAttribute("indexed");
    let tempNotes = notes;
    tempNotes.splice(index, 1);
    setNotes([...tempNotes]);
  }

  function deleteLocalStorageItem(e) {
    const index = e.target.getAttribute("indexed");
    localStorage.removeItem(localStorage.key(index));
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
        year: props.year,
        month: props.month,
        day: props.day,
      };
      localStorage.setItem(
        event.name + ": " + props.year + "-" + props.month + "-" + props.day,
        JSON.stringify(event)
      );
      setNotes([]);
    });
  }

  function returnArrayOfLocalStorage() {
    let notesFromLocalStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
      let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (
        item.year == props.year &&
        item.month == props.month &&
        item.day == props.day
      ) {
        notesFromLocalStorage.push(item);
      }
    }
    return notesFromLocalStorage;
  }

  function returnLocalStorageList() {
    return memoizedLSArray.map((value, index) => {
      return (
        <li key={index}>
          <DayListElement
            del={deleteLocalStorageItem}
            number={index}
            index={index + 1}
            text={value.name}
            time={value.time}
          />
        </li>
      );
    });
  }

  function returnList() {
    const listToReturn = notes.map((value, index) => {
      return (
        <li key={index}>
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
      <h2>Zapisane wydarzenia</h2>
      {returnLocalStorageList()}
    </div>
  );
}

export default DayView;
