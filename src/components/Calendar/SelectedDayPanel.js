/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import EventForm from './EventForm';

function SelectedDayPanel(props) {
  const {
    selectedDay,
    newEventOnSubmit,
    editEventOnSubmit,
    userData,
    deleteEventOnClick
  } = props;

  const [toggleEventIndex, setToggleEventIndex] = useState(null);

  const EventsForSelectedDay = userData.events.filter(
    (event) => event.date === selectedDay
  );

  const toggleEditEventForm = (index) => {
    if (toggleEventIndex !== index) {
      setToggleEventIndex(index);
    } else if (toggleEventIndex === index) {
      setToggleEventIndex(null);
    }
  };

  const RenderEventsForSelectedDay = EventsForSelectedDay.map(
    (event, index) => {
      return (
        <li key={event.id}>
          {event.info}
          <button type="button" onClick={() => toggleEditEventForm(index)}>
            Edit
          </button>
          <button type="button" onClick={() => deleteEventOnClick(event.id)}>
            Delete
          </button>

          {index === toggleEventIndex ? (
            <EventForm
              selectedDay={selectedDay}
              newEventOnSubmit={newEventOnSubmit}
              editEventOnSubmit={editEventOnSubmit}
              categories={userData.categories}
              event={EventsForSelectedDay[index]}
            />
          ) : (
            ''
          )}
        </li>
      );
    }
  );
  return (
    <div>
      <div className="selected_day_event_panel">
        <h2>Selected Day: {selectedDay}</h2>
        <div className="selected_day_event_panel_button_row">
          <button type="button">Add Event</button>
          <button type="button">Event Overview</button>
          <button type="button">Analytics </button>
        </div>

        <h3>Events for This Day:</h3>
        <ul>{RenderEventsForSelectedDay}</ul>

        <EventForm
          selectedDay={selectedDay}
          editEventOnSubmit={editEventOnSubmit}
          newEventOnSubmit={newEventOnSubmit}
          categories={userData.categories}
          event={null}
        />
      </div>
    </div>
  );
}

export default SelectedDayPanel;
