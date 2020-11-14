import React, { useEffect, useState } from 'react';
import WidgetApiService from '../../services/widget-api-service';

function Widget(props) {
  const [widget, setWidget] = useState({});
  const [changeNameInput, setChangeNameInput] = useState('');

  useEffect(() => {
    console.log(props.id);
    WidgetApiService.getWidget(props.id).then((w) => setWidget(w));
  }, [props.id]);

  const updateWidget = async (e) => {
    e.preventDefault();
    await WidgetApiService.updateWidget({ name: changeNameInput }, widget.id)
      .then(setWidget({ ...widget, name: changeNameInput }))
      .then(setChangeNameInput(''));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setChangeNameInput(value);
  };

  return (
    <div>
      <p>Widget Number {props.id}</p>
      <p>{widget.name}</p>
      <form onSubmit={updateWidget}>
        <label>Change Widget Name</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={changeNameInput}
        />
        <button type="submit">Change</button>
      </form>
    </div>
  );
}

export default Widget;
