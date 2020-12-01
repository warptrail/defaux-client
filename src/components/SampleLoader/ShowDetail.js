import React from 'react';

const ShowDetail = (props) => {
  const { name, company, party, location } = props.details;
  return (
    <div>
      <p>The details are now loaded</p>
      <div>
        <strong>Name: {name}</strong>
      </div>
      <div>
        <strong>company: {company}</strong>
      </div>
      <div>
        <strong>Party: {party}</strong>
      </div>
      <div>
        <strong>location: {location}</strong>
      </div>
    </div>
  );
};

export default ShowDetail;
