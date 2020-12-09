import React, { useState, useEffect } from 'react';

function DuoCounter() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return (
    <div className="header_counter">
      <h3>{seconds} seconds have passed since reload</h3>
    </div>
  );
}

export default DuoCounter;
