/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeekday from 'dayjs/plugin/isoWeek';
import updateLocale from 'dayjs/plugin/updateLocale';

import 'dayjs/locale/en';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import MonthPicker from './MonthPicker';

import './Calendar.css';
import { setDate } from 'date-fns';

dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(isoWeekday);

dayjs.updateLocale('en', {
  weekStart: 1
});
dayjs.locale('en');

function Calendar() {
  const [dateObject, setDateObject] = useState(dayjs().locale('en'));
  const [showMonthTable, setShowMonthTable] = useState(false);

  const coffeeIcon = <FontAwesomeIcon icon={faCoffee} />;

  // Build the Calendar with Mosh
  const firstDayOfMonth = () => {
    const firstDay = dateObject.startOf('month').weekday();
    console.log(firstDay);
    return firstDay;
  };

  const populateCalendarDaysOfWeek = () => {
    const daysOfTheWeek = [];

    for (let i = 0; i <= 6; i++) {
      daysOfTheWeek.push(dayjs().weekday(i).format('dddd'));
    }

    return daysOfTheWeek.map((day) => {
      return <td key={day}>{day}</td>;
    });
  };

  // Highlight the current day
  const currentDay = () => {
    if (dateObject.format('MYYYY') === dayjs().format('MYYYY')) {
      return dateObject.format('D');
    }
  };

  // * This month and year header display

  const printThisMonthHeader = () => {
    return dateObject.format('MMMM');
  };

  // Year picker
  const printThisYearHeader = () => {
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
  const getDaysInMonth = dateObject.daysInMonth();

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

  // * month navigation
  const nextMonth = () => {
    setDateObject(dateObject.add(1, 'month'));
  };

  const prevMonth = () => {
    setDateObject(dateObject.subtract(1, 'month'));
  };

  // * month picker
  const arrayOfMonthNames = () => {
    const epoch = '1970-01-01';
    let monthNames = [];

    // Makes an array of each month name
    for (let i = 0; i < 12; i++) {
      monthNames.push(dayjs(epoch).add(i, 'month').format('MMMM'));
    }
    return monthNames;
  };

  // Changing to a specific month
  const setMonth = (month) => {
    let selectedYear = dayjs(dateObject).format('YYYY');
    const months = arrayOfMonthNames();
    let monthNo = months.indexOf(month);
    let selectMonthDateObject = { ...dateObject };
    //selectMonthDateObject = dayjs().month(monthNo).year(selectedYear);

    setDateObject(dayjs().month(monthNo).year(selectedYear));
    setShowMonthTable(!showMonthTable);
  };

  const MonthList = (monthNames) => {
    let months = [];

    monthNames.map((month) => {
      months.push(
        <td
          key={month}
          className="calendar-month"
          onClick={(e) => {
            setMonth(month);
          }}
        >
          <span>{month}</span>
        </td>
      );
    });

    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells); // add last row

    let monthlist = rows.map((m, i) => {
      return <tr key={i}>{m}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };

  // toggle show month picker
  const showMonthPicker = (e, month) => {
    setShowMonthTable(!showMonthTable);
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

      <p>First day of the month view is: {firstDayOfMonth()}</p>
      <p>Last day of the month view is: {'to be determined'}</p>

      <div className="calendar-box">
        <div className="tail-datetime-calendar">
          <div
            className="month-name"
            onClick={(e) => {
              showMonthPicker();
            }}
          >
            <h3>{printThisMonthHeader()}</h3>
          </div>
          <div className="month-picker">
            {showMonthTable && MonthList(arrayOfMonthNames())}
          </div>
          <div className="year-name">
            <button>Past</button>
            <h3>{printThisYearHeader()}</h3>
            <button>Future</button>
          </div>
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
