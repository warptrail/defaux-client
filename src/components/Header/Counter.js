import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log('hi');
  }, [count]);

  useEffect(() => {
    const id = setInterval(() => {
      setOtherCount(otherCount + 1);
    }, 1000);
    const yello = 'hi';
    return () => clearInterval(id);
  }, [otherCount]);

  return (
    <div className="header_counter">
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click Here
      </button>
      <h3>{otherCount} seconds have passed since reload</h3>
    </div>
  );
}

export default Counter;
