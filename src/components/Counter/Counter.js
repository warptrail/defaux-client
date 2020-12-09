/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

function Counter() {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  useEffect(() => {
    console.log('count A', countA);
  }, [countA]);

  useEffect(() => {
    console.log('count B', countB);
  }, [countB]);

  return (
    <div>
      <h3>Let us Count the ways</h3>
      <div className="counter">
        <div className="time">{countA}</div>
        <div className="time">{countB}</div>
        <button
          onClick={() => {
            setCountA(countA + 1);
          }}
        >
          Count A
        </button>
        <button
          onClick={() => {
            setCountB(countB + 1);
          }}
        >
          Count B
        </button>
      </div>
    </div>
  );
}

export default Counter;
