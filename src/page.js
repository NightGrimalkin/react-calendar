import React, { useEffect, useState } from "react";
import Calendar from "./Calendar.js";
import DayView from "./DayView.js";
import "./Page.css";

function Page(props) {
  const [whatRender, setWhatRender] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function handleCalendarClickCal(e) {
    const monthVal = e.currentTarget.getAttribute("monthval");
    setWhatRender(1);
    setMonth(monthVal);
  }
  function handleCalendarClickDay(e) {
    const dayVal = e.currentTarget.getAttribute("dayval");
    setWhatRender(2);
    setDay(dayVal);
  }

  function revertHandleCalendarClickCal(e) {
    const monthVal = e.currentTarget.getAttribute("monthval");
    setWhatRender(0);
    setMonth(0);
  }
  function revertHandleCalendarClickDay(e) {
    setWhatRender(1);
    setDay(0);
  }

  useEffect(() => {}, []);

  return (
    <>
      {whatRender == 0 ? (
        <>
          <h1>{year}</h1>
          <button
            onClick={() => {
              setYear(year - 1);
            }}
          >
            Rok wczesniej
          </button>
          <button
            onClick={() => {
              setYear(year + 1);
            }}
          >
            Rok pozniej
          </button>
          <div className="entireSmallCalendar">
            {months.map((val, index) => {
              return (
                <div className="smallCalendarWithMonth" key={index + " " + val}>
                  <h1>{val}</h1>
                  <Calendar
                    month={index + 1}
                    year={year}
                    controlingfunctionCal={handleCalendarClickCal}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) :(whatRender==1)? (
        <>
        <button onClick={revertHandleCalendarClickCal}>Powrót do widoku lat</button>
          <h1>
            {year}/{month}
          </h1>
          <button
            onClick={() => {
              {
                month == 1 ? setMonth(12) : setMonth(+month - 1);
              }
            }}
          >
            miesiac wczesniej
          </button>
          <button
            onClick={() => {
              {
                month == 12 ? setMonth(1) : setMonth(+month + 1);
              }
            }}
          >
            miesiac pozniej
          </button>
          <div className="entireBigCalendar">
            <Calendar year={year} month={month} controlingFunctionDay={handleCalendarClickDay} />
          </div>
        </>
      ):
      <>
      <button onClick={revertHandleCalendarClickDay}>Powrót do widoku miesiaca</button>
      <DayView year={year} month={month} day={day}/>
      </>
      }
    </>
  );
}

export default Page;
