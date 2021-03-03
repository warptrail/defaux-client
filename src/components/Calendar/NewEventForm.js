/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import dayjs from 'dayjs';

function NewEventForm(props) {
  const { categories, newEventOnSubmit, selectedDay } = props;

  const [eventObject, setEventObject] = useState({
    time: dayjs().format('HH:mm'),
    info: 'blank event',
    category_id: 1,
    start_timestamp: '',
    end_timestamp: null
  });

  // function that runs from the form submit button
  const onClickButton = (e) => {
    e.preventDefault();

    const newEventDateStamp = `${props.selectedDay}T${
      eventObject.time
    }:00${dayjs().format('Z')}`;

    const makeNewEventObject = {
      info: eventObject.info,
      category_id: eventObject.category_id,
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
      category_id: 1,
      start_timestamp: '',
      end_timestamp: ''
    });
  };

  // handleChange for multiple inputs
  const handleChange = (e) => {
    const { value } = e.target;
    setEventObject({
      ...eventObject,
      [e.target.name]: value
    });
  };

  // render the categories in the selector from props

  const renderCategorySelector = categories.map((category) => {
    return (
      <option key={`option-${category.category_id}`}>
        {category.encoded_name}
      </option>
    );
  });

  console.log(categories);

  return (
    <form
      className="new_event_form"
      onSubmit={(e) => {
        onClickButton(e);
      }}
    >
      <label>Info</label>
      <input
        id="new-event-info"
        name="info"
        type="text"
        value={eventObject.info}
        onChange={handleChange}
      />
      <label>Category</label>
      <select
        id="new-event-category"
        name="category_id"
        type="text"
        value={eventObject.category_id}
        onChange={handleChange}
      >
        {renderCategorySelector}
      </select>
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
