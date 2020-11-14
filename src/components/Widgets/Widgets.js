import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WidgetApiService from '../../services/widget-api-service';

import NewWidget from './NewWidget';

function Widgets() {
  const [widgets, setWidgets] = useState([]);

  // Widgets load when page opens
  useEffect(() => {
    WidgetApiService.getWidgets().then((w) => {
      setWidgets(w);
    });
  }, []);

  const deleteWidget = async (id) => {
    const preDeleteWidgets = widgets;
    const postDeleteWidgets = preDeleteWidgets.filter((w) => {
      return w.id !== id;
    });
    await WidgetApiService.deleteWidget(id).then(() => {
      setWidgets(postDeleteWidgets);
    });
  };

  const postNewWidget = async (data) => {
    await WidgetApiService.newWidget(data).then(([res]) => {
      setWidgets([...widgets, res]);
    });
  };

  const renderWidgets = () => {
    return widgets.map((widget, index) => (
      <div key={index}>
        <Link to={`/widget/${widget.id}`}>
          <p>
            {widget.id} {widget.name}
          </p>
        </Link>

        <button type="button" onClick={() => deleteWidget(widget.id)}>
          Delete
        </button>
      </div>
    ));
  };

  return (
    <div>
      <h2>The Widgets Go Here</h2>
      <div>{renderWidgets()}</div>
      <NewWidget postNewWidget={postNewWidget} />
    </div>
  );
}

export default Widgets;
