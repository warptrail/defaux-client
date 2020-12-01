import React, { useState } from 'react';

function RandomBeep() {
  const [beep, setBeep] = useState(0);
  const randomizeBeep = () => {
    setBeep(Math.floor(Math.random() * 20));
  };
  return (
    <div className="beep_box">
      <p>{beep}</p>
      <button type="button" onClick={randomizeBeep}>
        set beep
      </button>
    </div>
  );
}

export default RandomBeep;
