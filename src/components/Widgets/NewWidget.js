import React, { useState } from 'react';
import WidgetApiService from '../../services/widget-api-service';

function NewWidget(props) {
  const [newWidgetName, setNewWidgetName] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setNewWidgetName(value);
  };

  const handleNewWidget = async (e) => {
    e.preventDefault();
    const data = { name: newWidgetName };
    const { postNewWidget } = props;
    postNewWidget(data);
    setNewWidgetName('');
  };

  return (
    <form onSubmit={handleNewWidget}>
      <h3>Create New Widget</h3>
      <label htmlFor="create_new_widget_field">Name</label>
      <input
        id="create_new_widget_field"
        type="text"
        value={newWidgetName}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewWidget;
