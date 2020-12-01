import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import './Calendar.css';

moment.updateLocale('en', { week: { dow: 1 } });

function Calendar() {
  const sampleDate = '1976-04-19T12:59-0500';
  const value = moment();
  const firstDayOfThisMonth = value.clone().startOf('month');
  const startDate = value.clone().startOf('month').startOf('week');
  const lastDayOfThisMonth = value.clone().endOf('month');
  const endDay = value.clone().endOf('month').endOf('week');
  const day = startDate.clone().subtract(1, 'day');

  console.log(value);
  console.log(startDate);

  const coffeeIcon = <FontAwesomeIcon icon={faCoffee} />;

  return (
    <div>
      <h3>the endless march of time</h3>
      <div className="icon">{coffeeIcon}</div>
      <p>{sampleDate}</p>

      <div className="this_month_info">
        <p>Today is: {value.format('MM/DD')}</p>
        <p>First day of this month: {firstDayOfThisMonth.format('MM/DD')}</p>
        <p>
          First day of the first week of this month: {startDate.format('MM/DD')}
        </p>
        <p>Last day of this month: {lastDayOfThisMonth.format('MM/DD')}</p>
        <p>
          Last day of the last week of this month: {endDay.format('MM/DD')}{' '}
        </p>
        <p>{day.format('MM/DD')}</p>
      </div>
    </div>
  );
}

export default Calendar;
