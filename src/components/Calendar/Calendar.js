/* eslint-disable no-plusplus */
import React from 'react';
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
  const coffeeIcon = <FontAwesomeIcon icon={faCoffee} />;
  const date = '2000-01-31T2:33:00';

  const firstDayOfMonth = dayjs(date)
    .startOf('month')
    .startOf('week')
    .format('dddd MM-DD-YYYY');
  const lastDayOfMonth = dayjs(date)
    .endOf('month')
    .endOf('week')
    .format('ddd MM-DD-YYYY');

  const populateCalendarDaysOfWeek = () => {
    const daysOfTheWeek = [];
    for (let i = 0; i <= 6; i++) {
      daysOfTheWeek.push(dayjs().weekday(i).format('dddd'));
    }
    return daysOfTheWeek.map((day) => {
      return <th key={day}>{day}</th>;
    });
  };

  return (
    <div>
      <h2>the endless march of time</h2>
      <div className="icon">{coffeeIcon}</div>
      <DayJS format="MM-DD-YYYY">{date}</DayJS>
      <br />
      <DayJS format="YYYY">{date}</DayJS>

      <p>First day of the month view is: {firstDayOfMonth}</p>
      <p>Last day of the month view is: {lastDayOfMonth}</p>

      <table>
        <thead>
          <tr>{populateCalendarDaysOfWeek()}</tr>
        </thead>
        <tbody>
          <tr>
            <td>hi</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
