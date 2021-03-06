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

import CategoryDashboard from './CategoryDashboard';

import CalendarApiService from '../../services/calendar-api-service';

import './Calendar.css';
import SelectedDayPanel from './SelectedDayPanel';

dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(isoWeekday);

dayjs.updateLocale('en', {
  weekStart: 1
});
dayjs.locale('en');

CalendarApiService.getEvents();

function Calendar() {
  // * Highlight the current day
  const currentDay = () => {
    if (dateObject.format('MYYYY') === dayjs().format('MYYYY')) {
      return Number(dateObject.format('D'));
    }
  };

  // * Events load when page opens

  useEffect(() => {
    const fetchData = async () => {
      const resEvents = await CalendarApiService.getEvents();
      const resCategories = await CalendarApiService.getCategories();

      setUserData({ events: resEvents, categories: resCategories });
    };

    fetchData();
  }, []);

  //* State
  const [dateObject, setDateObject] = useState(dayjs().locale('en'));
  const [showMonthTable, setShowMonthTable] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [goToYear, setGoToYear] = useState(dayjs().format('YYYY'));
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [userData, setUserData] = useState({ events: [], categories: [] });

  //* Form submit functions to prop drill into form sub components
  const newEventOnSubmit = async (obj) => {
    try {
      const newEventObject = obj;
      const userDataEvents = userData.events;

      console.log(obj);

      userDataEvents.push(newEventObject);

      await CalendarApiService.postNewEvent(newEventObject);
      const updatedEventArray = await CalendarApiService.getEvents();

      setUserData({ ...userData, events: updatedEventArray });
    } catch (error) {
      console.log(error);
    }
  };

  const editEventOnSubmit = async (eventObject) => {
    try {
      const eventId = eventObject.id;
      await CalendarApiService.updateEvent(eventObject, eventId);

      const updatedEventArray = userData.events;
      let indexToUpdate = null;

      // get the event index before update
      userData.events.find((ev, index) => {
        if (ev.id === eventId) {
          indexToUpdate = index;
          return true;
        }
      });

      updatedEventArray[indexToUpdate] = eventObject;

      setUserData({ ...userData, events: updatedEventArray });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEventOnClick = async (eventId) => {
    try {
      console.log('deleting ', eventId);
      await CalendarApiService.deleteEvent(eventId);

      // update state
      const preDeleteEvents = userData.events;
      const postDeleteEvents = preDeleteEvents.filter(
        (deletedEvent) => deletedEvent.id !== eventId
      );

      setUserData({ ...userData, events: postDeleteEvents });
    } catch (error) {
      console.log(error);
    }
  };

  const newCategoryOnSubmit = async (categoryObject) => {
    try {
      const userDataCategories = userData.categories;

      userDataCategories.push(categoryObject);

      await CalendarApiService.postNewCategory(categoryObject);

      const updatedCategoryArray = await CalendarApiService.getCategories();

      setUserData({ ...userData, categories: updatedCategoryArray });
    } catch (error) {
      console.log(error);
    }
  };

  const editCategoryOnSubmit = async (categoryObject) => {
    try {
      const categoryId = categoryObject.category_id;
      await CalendarApiService.updateCategory(categoryObject, categoryId);

      const updatedCategoryArray = userData.categories;
      let indexToUpdate = null;
      // get the category index before update
      userData.categories.find((cat, index) => {
        if (cat.category_id === categoryId) {
          indexToUpdate = index;
          return true;
        }
      });

      // make the updates
      updatedCategoryArray[indexToUpdate] = categoryObject;

      setUserData({ ...userData, categories: updatedCategoryArray });
    } catch (error) {
      console.log(error);
    }
  };

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

    for (let i = 0; i < userData.events.length; i++) {
      if (userData.events[i].date === allTheDates.format('YYYY-MM-DD')) {
        dailyEvents.push(userData.events[i]);
      }
    }

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
          {dailyEvents.map((event, i) => (
            <li
              key={i}
              onClick={(e) => {
                onDayClickChild(e);
              }}
            >
              {event.category}
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
    console.log('parent', parent);
    setSelectedDay(selectDay);
  };

  // * Display the selected day
  const displaySelectedDay = () => {
    return <p>The selected Day is {dayjs(selectedDay).format('MM/DD/YYYY')}</p>;
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
  // console.log(selectedDay);

  // ??????? RETURN ??????
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

        {/* Selected Day Panel */}

        <SelectedDayPanel
          selectedDay={selectedDay}
          userData={userData}
          newEventOnSubmit={newEventOnSubmit}
          editEventOnSubmit={editEventOnSubmit}
          deleteEventOnClick={deleteEventOnClick}
        />

        {/* Category Form */}
        <CategoryDashboard
          newCategoryOnSubmit={newCategoryOnSubmit}
          editCategoryOnSubmit={editCategoryOnSubmit}
          categories={userData.categories}
        />
      </div>
    </div>
  );
}

export default Calendar;
