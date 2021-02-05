/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import dayjs from 'dayjs';

function NewEventForm(props) {
  const [eventObject, setEventObject] = useState({
    time: dayjs().format('HH:mm'),
    info: '',
    category: 'general',
    start_timestamp: '',
    end_timestamp: null
  });

  // console.log(dayjs('2018-04-04T16:00:00Z'));

  const { newEventOnSubmit } = props;

  const onClickButton = (e) => {
    e.preventDefault();
    const newEventDateStamp = `${props.selectedDay}T${
      eventObject.time
    }:00${dayjs().format('Z')}`;
    const makeNewEventObject = {
      ...eventObject,
      start_timestamp: newEventDateStamp,
      end_timestamp: dayjs(newEventDateStamp)
        .add(1, 'hour')
        .format('YYYY-MM-DDTHH:mm:ssZ')
    };

    // const currentDateStamp = dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]');
    newEventOnSubmit(makeNewEventObject);
    setEventObject({
      ...eventObject,
      info: '',
      category: 'general',
      start_timestamp: '',
      end_timestamp: ''
    });
  };

  // handleChange for multiple inputs
  const handleChange = (e) => {
    console.log(e.target.name);
    const { value } = e.target;
    setEventObject({
      ...eventObject,
      [e.target.name]: value
    });
  };

  return (
    <form
      className="new_event_form"
      onSubmit={(e) => {
        onClickButton(e);
      }}
    >
      <p>{props.selectedDay}</p>
      <label>Info</label>
      <input
        id="new-event-info"
        name="info"
        type="text"
        value={eventObject.info}
        onChange={handleChange}
      />
      <label>Category</label>
      <input
        id="new-event-category"
        name="category"
        type="text"
        value={eventObject.category}
        onChange={handleChange}
      />
      <label>Time</label>
      <input
        id="new-event-time"
        name="time"
        type="time"
        value={eventObject.time}
        onChange={handleChange}
      />

      <button type="submit">Create New Event</button>
    </form>
  );
}

export default NewEventForm;
