import React, { useState, useEffect } from 'react';

function Counter() {
  const [countZ, setcountZ] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count 1', countZ);
  }, [countZ]);
  useEffect(() => {
    console.log('count 2', count);
  }, [count]);

  return (
    <div>
      <h3>Let us Count the ways</h3>
      <div className="counter">
        <div className="time">{countZ}</div>
        <div className="time">{count}</div>
        <button
          onClick={() => {
            setcountZ(countZ + 1);
          }}
        >
          Count 1
        </button>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Count 2
        </button>
      </div>
    </div>
  );
}

export default Counter;
