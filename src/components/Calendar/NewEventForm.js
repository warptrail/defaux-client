import React, { useState } from 'react';

function NewEventForm(props) {
  const makeEventObject = { stuff: 'things', arg: 34 };

  const { newEventOnSubmit } = props;
  const onClickButton = (e) => {
    e.preventDefault();
    newEventOnSubmit(makeEventObject);
  };

  return (
    <form
      className="new_event_form"
      onSubmit={(e) => {
        onClickButton(e);
      }}
    >
      <label>Info</label>
      <input type="text" />
      <label>Category</label>
      <input type="text" />
      <button type="submit">Create New Event</button>
      {props.selectedDay}
    </form>
  );
}

export default NewEventForm;
