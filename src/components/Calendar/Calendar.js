/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import DayJS from 'react-dayjs';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeekday from 'dayjs/plugin/isoWeek';
import updateLocale from 'dayjs/plugin/updateLocale';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import './Calendar.css';

dayjs.extend(weekday);
dayjs.extend(updateLocale);
dayjs.extend(isoWeekday);

dayjs.updateLocale('en', {
  weekStart: 1
});

function Calendar() {
  const date = '2020-10-25T2:33:00';
  const [dateObject, setDateObject] = useState(dayjs());

  const coffeeIcon = <FontAwesomeIcon icon={faCoffee} />;

  // Build the Calendar with Mosh
  const firstDayOfMonth = () => {
    const firstDay = dayjs(dateObject).startOf('month').format('d');
    console.log('firstDay: ', firstDay - 1);
    return firstDay - 1;
  };

  // Merged Month Calendar View
  // const firstDayOfMonth = dayjs(date)
  //   .startOf('month')
  //   .startOf('week')
  //   .format('ddd MM-DD-YYYY');
  // const lastDayOfMonth = dayjs(date)
  //   .endOf('month')
  //   .endOf('week')
  //   .format('ddd MM-DD-YYYY');

  const populateCalendarDaysOfWeek = () => {
    const daysOfTheWeek = [];
    for (let i = 0; i <= 6; i++) {
      daysOfTheWeek.push(dayjs().weekday(i).format('dddd'));
    }
    return daysOfTheWeek.map((day) => {
      return <td key={day}>{day}</td>;
    });
  };

  // const populateWeeks = () => {
  //   const week = [];
  //   for (let w = 0; w < 6; w++) {
  //     week.push(dayjs(dateObject).add(w, 'day'));
  //   }
  //   return week;
  // };

  // Highlight the current day
  const currentDay = () => {
    return dateObject.format('D');
  };

  // Month picker

  const month = () => {
    return dateObject.format('MMMM');
  };

  // Year picker
  const year = () => {
    return dateObject.format('YYYY');
  };

  // make array of calendar days blank and filled with days in the month
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(
      <td key={i + 1000} className="calendar-day-empty">
        {''}
      </td>
    );
  }

  let daysInMonth = [];
  const getDaysInMonth = dayjs(dateObject).daysInMonth();

  let currentDate = dayjs().format('MYYYYD');

  for (let d = 1; d <= getDaysInMonth; d++) {
    let isToday = d == currentDay() ? 'today' : '';
    daysInMonth.push(
      <td key={d} className={`calendar-day ${isToday}`}>
        {d}
      </td>
    );
  }

  // combine blanks with daysInMonth
  const totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  // Now we have all <td> elements for the days in the
  // month we can make an array of arrays
  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  let calendarDays = rows.map((d, i) => {
    return <tr key={i}>{d}</tr>;
  });

  // month navigation
  const nextMonth = () => {
    setDateObject(dayjs(dateObject).add(1, 'month'));
  };

  const prevMonth = () => {
    setDateObject(dayjs(dateObject).subtract(1, 'month'));
  };

  // console.log(populateWeeks());
  console.log(firstDayOfMonth());
  console.log(dateObject);
  console.log(blanks);
  console.log(daysInMonth);
  console.log(cells);
  console.log(rows);
  console.log(calendarDays);
  console.log(currentDay());

  return (
    <div>
      <h2>the endless march of time</h2>
      <div className="icon">{coffeeIcon}</div>
      <DayJS format="MM-DD-YYYY">{date}</DayJS>
      <br />
      <DayJS format="YYYY">{date}</DayJS>

      <p>First day of the month view is: {firstDayOfMonth()}</p>
      <p>Last day of the month view is: {'to be determined'}</p>

      <div className="calendar-box">
        <div className="tail-datetime-calendar">
          <div className="month-name">{month()}</div>
          <div className="year-name">{year()}</div>
          <div className="month-navigation">
            <button type="button" onClick={prevMonth}>
              prev
            </button>
            <button type="button" onClick={nextMonth}>
              next
            </button>
          </div>
        </div>
        <table className="calendar-day">
          <thead>
            <tr>{populateCalendarDaysOfWeek()}</tr>
          </thead>
          <tbody>{calendarDays}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Calendar;
