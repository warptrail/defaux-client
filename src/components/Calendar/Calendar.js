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
import { isCompositeComponent } from 'react-dom/test-utils';

dayjs.extend(weekday);
dayjs.extend(updateLocale);
dayjs.extend(isoWeekday);

dayjs.updateLocale('en', {
  weekStart: 1
});

function Calendar() {
  const date = '2020-10-25T2:33:00';
  const [dateObject, setDateObject] = useState(dayjs(date));

  const coffeeIcon = <FontAwesomeIcon icon={faCoffee} />;

  // Build the Calendar with Mosh
  const firstDayOfMonth = () => {
    const firstDay = dayjs(dateObject).startOf('month').format('d');
    return firstDay;
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

  const populateWeeks = () => {
    const week = [];
    for (let w = 0; w < 6; w++) {
      week.push(dayjs(date).add(w, 'day'));
    }
    return week;
  };

  // make array of calendar days blank and filled with days in the month
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<td className="calendar-day-empty">{''}</td>);
  }

  let daysInMonth = [];
  const getDaysInMonth = dayjs(dateObject).daysInMonth();

  for (let d = 1; d <= getDaysInMonth; d++) {
    daysInMonth.push(
      <td key={d} className="calendar-day">
        {d}
      </td>
    );
  }

  // Now we have all <td> elements for the days in the month

  console.log(populateWeeks());
  console.log(dateObject);
  console.log(blanks);
  console.log(daysInMonth);

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
        <table>
          <thead>
            <tr>{populateCalendarDaysOfWeek()}</tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default Calendar;
