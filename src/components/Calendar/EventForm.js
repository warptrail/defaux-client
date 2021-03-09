/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function EventForm(props) {
  // * Props
  const {
    categories,
    newEventOnSubmit,
    editEventOnSubmit,
    event,
    selectedDay
  } = props;

  console.log(categories);

  const setTime = event
    ? dayjs(event.timestamp).format('HH:mm')
    : dayjs().format('HH:mm');

  const setInfo = event ? event.info : 'blank event';

  // * State
  const [eventInput, setEventInput] = useState({
    time: setTime,
    info: setInfo,
    category_id: null
  });

  // function that runs from the form submit button
  const onClickSubmit = (e) => {
    e.preventDefault();

    // const currentDateStamp = dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]');
    const newEventTimestamp = `${selectedDay}T${
      eventInput.time
    }:00${dayjs().format('Z')}`;

    const makeNewEventObject = {
      info: eventInput.info,
      timestamp: newEventTimestamp,
      date: selectedDay
    };

    if (categories) {
      makeNewEventObject.category_id = eventInput.category_id;
    } else if (eventInput.category_id === 'none') {
      makeNewEventObject.category_id = null;
    }

    console.log(makeNewEventObject);

    if (!event) {
      newEventOnSubmit(makeNewEventObject);
      setEventInput({
        ...eventInput,
        info: 'blank event',
        category_id: categories[0] || 'none',
        time: dayjs().format('HH:mm')
      });
    } else {
      makeNewEventObject.id = event.id;
      editEventOnSubmit(makeNewEventObject);
    }
  };

  // handleChange for multiple inputs
  const handleChange = (e) => {
    const { value } = e.target;
    setEventInput({
      ...eventInput,
      [e.target.name]: value
    });
  };

  // render the categories in the selector from props

  const renderCategorySelector = categories.map((category) => {
    return (
      <option
        key={`option-${category.category_id}`}
        value={category.category_id}
      >
        {category.encoded_name}
      </option>
    );
  });

  return (
    <form
      className="new_event_form"
      onSubmit={(e) => {
        onClickSubmit(e);
      }}
    >
      <label>Info</label>
      <input
        id="new-event-info"
        name="info"
        type="text"
        value={eventInput.info}
        onChange={handleChange}
      />
      <label>Category</label>
      <select
        id="new-event-category"
        name="category_id"
        type="text"
        value={eventInput.category_id || 'none'}
        onChange={handleChange}
      >
        {renderCategorySelector}
      </select>
      <label>Time</label>
      <input
        id="new-event-time"
        name="time"
        type="time"
        value={eventInput.time}
        onChange={handleChange}
      />

      {event ? (
        <button type="submit">Edit Event</button>
      ) : (
        <button type="submit">Create New Event</button>
      )}
    </form>
  );
}

export default EventForm;
