import React, { useEffect, useState } from "react";
import Day from "./Day.js";
import "./calendar.css";

function Calendar(props) {
  const [date, setDate] = useState([props.year, props.month, 1]);

  function checkEventsInDay(day) {
    for (let i = 0; i < localStorage.length; i++) {
      let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (item.year == date[0] && item.month == date[1] && item.day == day) {
        return true;
      }
    }
    return false;
  }

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

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function determineDaysOfMonth(y, m) {
    return new Date(y, m, 0).getDate();
  }

  function determineDayOfWeek(y, m, d) {
    let dayOfWeek = new Date(y, m, d).getDay();
    dayOfWeek = dayOfWeek == 0 ? 6 : dayOfWeek - 1;
    return dayOfWeek;
  }

  function createMonthArray(y, m, d) {
    let tempMonthArr = [];
    let firstDay = determineDayOfWeek(y, m - 1, d);
    let totalDays = determineDaysOfMonth(y, m);

    for (let i = 0; i < 42; i++) {
      if (i < firstDay - 1) {
        tempMonthArr.push(0);
      }
      if (i >= firstDay - 1 && i <= totalDays + firstDay - 1) {
        tempMonthArr.push(i - firstDay + 1);
      }
      if (i > totalDays + firstDay - 1) {
        tempMonthArr.push(0);
      }
    }
    return tempMonthArr;
  }

  useEffect(() => {
    // console.log("miesiace");
    // console.log(createMonthArray(date[0], date[1], date[2]));
    // console.log("rok w calendarze");
    // console.log(date[0]);
  }, []);

  useEffect(() => {
    setDate([props.year, props.month, 1]);
  }, [props.month]);
  useEffect(() => {
    setDate([props.year, props.month, 1]);
  }, [props.year]);

  return (
    <div
      className="smallCalendar"
      onClick={props.controlingfunctionCal}
      monthval={props.month}
    >
      {weekDays.map((val, index) => {
        return (
          <p className="singleWeekDay" key={index + " " + val}>
            {val}
          </p>
        );
      })}
      {createMonthArray(date[0], date[1], date[2]).map((val, index) => {
        return (
          <div
            key={index}
            className={
              checkEventsInDay(index) == true ? "singleDayEvent" : "singleDay"
            }
          >
            {val != 0 ? (
              <Day
                day={val}
                controlingFunctionDay={props.controlingFunctionDay}
                dayval={index}
              />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Calendar;
