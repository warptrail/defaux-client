/* eslint-disable react/prop-types */
import React from 'react';

import Dog from './Dog';

function DogList(props) {
  const { data } = props;

  const renderDogList = () => {
    return data.map((dog, i) => <Dog key={i} data={dog} />);
  };
  return <div className="dog-list">{renderDogList()}</div>;
}

export default DogList;
