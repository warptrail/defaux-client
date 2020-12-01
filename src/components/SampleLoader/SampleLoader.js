import React, { useState } from 'react';

import ShowDetail from './ShowDetail';
import Loader from './Loader';

import './SampleLoader.css';

function SampleLoader(props) {
  const [loading, setLoading] = useState(true);

  const { details } = props;

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  return (
    <div>
      <h3>This component will take 4 seconds to load.</h3>
      {loading ? <Loader /> : <ShowDetail details={details} />}
    </div>
  );
}

export default SampleLoader;
