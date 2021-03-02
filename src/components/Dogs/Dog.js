import React from 'react';

function Dog(props) {
  const { data } = props;

  return (
    <div className="dog-box">
      <ul>
        <li>Name: {data.name}</li>
        <li>Breed: {data.breed}</li>
      </ul>
    </div>
  );
}

export default Dog;
