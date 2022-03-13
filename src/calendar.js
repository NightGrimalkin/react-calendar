import React, { useEffect, useState } from "react";
import Day from "./Day.js";
import "./calendar.css"

function Calendar(props) {
  const [date, setDate] = useState(0);

  function determineDaysOfMonth(m, y) {
    return new Date(y, m, 0).getDate();
  }

  function determineDayOfWeek(d, m, y) {
    const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
    if (m < 3) {
      y -= 1;
    }
    const theDay = Math.floor(
      (y + y / 4 - y / 100 + y / 400 + t[m - 1] + d) % 7
    );
    if ((0 == y % 4 && 0 != y % 100) || (0 == y % 400 && (m != 1 || m != 2))) {
      return theDay;
    } else {
      if (theDay == 0) {
        return 6;
      }
      if (theDay != 0) {
        return theDay - 1;
      }
    }
  }

  function createMonthArray(d, m, y) {
    let tempMonthArr = [];
    let firstDay = determineDayOfWeek(d, m, y);
    let totalDays = determineDaysOfMonth(m, y);

    for (let i = 0; i < 42; i++) {
      if (i < firstDay-1) {
        tempMonthArr.push(0);
      }
      if (i >= firstDay-1 && i <= totalDays + firstDay-1) {
        tempMonthArr.push(i - firstDay+1);
      }
      if (i > totalDays + firstDay-1) {
        tempMonthArr.push(0);
      }
    }
    return tempMonthArr;
  }

  function returnDays() {
    let tempMonthArr=createMonthArray(date[0],date[1],date[2]);
    console.log(tempMonthArr);
    return tempMonthArr.map((val, index) => {
      return (
        <div key={index} className="singleDay">
          <Day day={val} />
        </div>
      );
    });
  }

  useEffect(() => {
    const month = props.month;
    const year = props.year;

    const tempDate = [1, month, year];
    setDate(tempDate);
  }, []);

  return (
    <div>
      <div className="dayAll">{returnDays()}</div>
    </div>
  );
}

export default Calendar;
