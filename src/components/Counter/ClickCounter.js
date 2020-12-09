import React, { useState, useEffect } from 'react';

function ClickCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log('hi');
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click Here
      </button>
    </div>
  );
}

export default ClickCounter;
