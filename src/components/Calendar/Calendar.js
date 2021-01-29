/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import React, { useState, useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeekday from 'dayjs/plugin/isoWeek';
import updateLocale from 'dayjs/plugin/updateLocale';

import 'dayjs/locale/en';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import './Calendar.css';

dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(isoWeekday);

dayjs.updateLocale('en', {
  weekStart: 1
});
dayjs.locale('en');

function Calendar() {
  // * Highlight the current day
  const currentDay = () => {
    if (dateObject.format('MYYYY') === dayjs().format('MYYYY')) {
      return Number(dateObject.format('D'));
    }
  };

  // * Sample Events
  const eventsStorage = [
    { date: '2021-01-01', info: 'First day of 2021' },
    { date: '2021-01-01', info: 'New Years Day' },
    { date: '2021-01-02', info: 'Second day of 2021' },
    { date: '2021-01-03', info: 'Third day of 2021' },
    { date: '2021-01-04', info: 'Fourth day of 2021' }
  ];

  //* State
  const [dateObject, setDateObject] = useState(dayjs().locale('en'));
  const [showMonthTable, setShowMonthTable] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [goToYear, setGoToYear] = useState(dayjs().format('YYYY'));
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [events, setEvents] = useState(eventsStorage);

  const coffeeIcon = <FontAwesomeIcon icon={faCoffee} />;

  // Build the Calendar with Mosh
  const firstDayOfMonth = () => {
    const firstDay = dateObject.startOf('month').weekday();
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

  // * This month and year header display

  const printThisMonthHeader = () => {
    return (
      <h3
        onClick={(e) => {
          showMonthPicker();
        }}
      >
        {dateObject.format('MMMM')}
      </h3>
    );
  };

  // * Year picker
  const printThisYearHeader = () => {
    return <h3 onClick={showYearPicker}>{dateObject.format('YYYY')}</h3>;
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

    let dateObjectMonth = dateObject.format('MM');
    let dateObjectYear = dateObject.format('YYYY');

    const compiledDateString = `${dateObjectYear}-${dateObjectMonth}-${d}`;

    let allTheDates = dayjs(compiledDateString);

    let isSelected =
      allTheDates.format('YYYY-MM-DD') == selectedDay ? 'selected' : '';

    // let event = { date: '2021-01-01', info: 'first day of 2021' };

    // push events from main event library if they match dateObject
    let dailyEvents = [];

    for (let i = 0; i < events.length; i++) {
      if (events[i].date === allTheDates.format('YYYY-MM-DD')) {
        //console.log(events[i][prop]);
        dailyEvents.push(events[i]);
      }
    }

    console.log(dailyEvents);

    daysInMonth.push(
      <td
        key={d}
        id={allTheDates.format('YYYY-MM-DD')}
        name={allTheDates.format('YYYY-MM-DD')}
        className={`calendar-day ${isToday} ${isSelected}`}
        onClick={(e) => {
          onDayClick(e);
        }}
      >
        <span name={d}>{d}</span>
        <ul>
          {dailyEvents.map((event) => (
            <li
              onClick={(e) => {
                onDayClickChild(e);
              }}
            >
              {event.info}
            </li>
          ))}
        </ul>
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

  // * year navigation
  const nextYear = () => {
    setDateObject(dateObject.add(1, 'year'));
  };

  const prevYear = () => {
    setDateObject(dateObject.subtract(1, 'year'));
  };

  // * Changing to a specific month & year
  const arrayOfMonthNames = () => {
    const epoch = '1970-01-01';
    let monthNames = [];

    // Makes an array of each month name
    for (let i = 0; i < 12; i++) {
      monthNames.push(dayjs(epoch).add(i, 'month').format('MMMM'));
    }
    return monthNames;
  };

  const setMonth = (month) => {
    let selectedYear = dayjs(dateObject).format('YYYY');
    const months = arrayOfMonthNames();
    let monthNo = months.indexOf(month);

    setDateObject(dayjs().month(monthNo).year(selectedYear));
    setShowMonthTable(!showMonthTable);
  };

  const setYear = (year) => {
    let selectedYear = dayjs(dateObject).format('YYYY');
    let selectedMonth = dayjs(dateObject).format('MMMM');
    const months = arrayOfMonthNames();
    let monthNo = months.indexOf(selectedMonth);

    setDateObject(dayjs().month(monthNo).year(year));
    console.log(selectedYear, year); // 2021
  };

  // * The table of month names to select
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

  // * toggle show month picker
  const showMonthPicker = (e, month) => {
    setShowMonthTable(!showMonthTable);
  };

  // * toggle show year picker
  const showYearPicker = (e, year) => {
    setShowYearSelector(!showYearSelector);
  };

  const handleYearChange = (e) => {
    const { value } = e.target;
    setGoToYear(value);
  };

  const goToChangedYear = (e, year) => {
    e.preventDefault();

    // setGoToYear(dayjs(dateObject).year(year));
    setDateObject(dayjs().year(goToYear));
    setShowYearSelector(false);
  };

  const yearInput = () => {
    const dateObjectYear = dayjs(dateObject).format('YYYY');
    return (
      <form className="change_year_form" onSubmit={goToChangedYear}>
        <input
          className="year_input"
          type="number"
          defaultValue={dateObjectYear}
          onChange={handleYearChange}
        />
        <button>Go</button>
      </form>
    );
  };

  // * Grab the selected day

  const onDayClick = (e) => {
    const selectDay = e.target.getAttribute('name');
    setSelectedDay(selectDay);
  };

  const onDayClickChild = (e) => {
    e.stopPropagation();
    const parent = e.target.parentElement.parentElement;
    const selectDay = parent.getAttribute('name');
    setSelectedDay(selectDay);
  };

  // * Display the selected day
  const displaySelectedDay = () => {
    return <p>The selected Day is {dayjs(selectedDay).format('DD/MM/YYYY')}</p>;
  };

  // * Add event to calendar
  const addEvent = () => {
    return <p>This is an event! Set for {selectedDay}</p>;
  };

  // ? Testing and Return
  // console.log(firstDayOfMonth());
  // console.log(dateObject);
  // console.log(blanks);
  // console.log(daysInMonth);
  // console.log(cells);
  // console.log(rows);
  // console.log(calendarDays);
  // console.log(currentDay());
  console.log(selectedDay);

  return (
    <div>
      <h2>the endless march of time</h2>
      <div className="icon">{coffeeIcon}</div>

      <p>First day of the month view is: {firstDayOfMonth()}</p>
      <p>Last day of the month view is: {'to be determined'}</p>
      {displaySelectedDay()}

      <div className="calendar-box">
        <div className="tail-datetime-calendar">
          <div className="month-name">
            <button
              type="button"
              onClick={prevMonth}
              name="previousMonthButton"
              className="previous_button"
            >
              {' '}
            </button>
            {printThisMonthHeader()}
            <button
              type="button"
              onClick={nextMonth}
              className="next_button"
              name="nextYearButton"
            />
          </div>
          <div className="month-picker">
            {showMonthTable && MonthList(arrayOfMonthNames())}
          </div>
          {/* * * * * * */}
          <div className="year-name">
            <button
              type="button"
              onClick={prevYear}
              name="nextMonthButton"
              className="previous_button"
            />
            {!showYearSelector && printThisYearHeader()}
            {showYearSelector && yearInput()}
            <button
              type="button"
              onClick={nextYear}
              name="nextMonthButton"
              className="next_button"
            />
          </div>
          {/* * * * * * */}
        </div>
        <table>
          <thead>
            <tr>{populateCalendarDaysOfWeek()}</tr>
          </thead>
          <tbody>{calendarDays}</tbody>
        </table>

        <button type="button">Add Event</button>
      </div>
    </div>
  );
}

export default Calendar;
