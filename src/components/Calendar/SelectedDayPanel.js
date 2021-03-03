/* eslint-disable react/prop-types */
import React from 'react';

import NewEventForm from './NewEventForm';

function SelectedDayPanel(props) {
  const { selectedDay, newEventOnSubmit, userData } = props;
  console.log(selectedDay);
  console.log(userData.events);

  const EventsForSelectedDay = userData.events.filter(
    (event) => event.date === selectedDay
  );

  const RenderEventsForSelectedDay = EventsForSelectedDay.map((event) => {
    return (
      <li key={event.id}>
        {event.info} - {event.real_name}
      </li>
    );
  });
  return (
    <div>
      <div className="selected_day_event_panel">
        <h2>Selected Day: {selectedDay}</h2>
        <div className="selected_day_event_panel_button_row">
          <button type="button">Add Event</button>
          <button type="button">Event Overview</button>
          <button type="button">Analytics </button>
        </div>

        <h3>Events for Today:</h3>
        <ul>{RenderEventsForSelectedDay}</ul>

        <NewEventForm
          selectedDay={selectedDay}
          newEventOnSubmit={newEventOnSubmit}
          categories={userData.categories}
        />
      </div>
    </div>
  );
}

export default SelectedDayPanel;
