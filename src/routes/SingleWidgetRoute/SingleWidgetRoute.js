import React from 'react';
import Widget from '../../components/Widgets/Widget';

function SingleWidgetRoute(props) {
  return (
    <div>
      <Widget id={props.match.params.widgetId} />
    </div>
  );
}

export default SingleWidgetRoute;
