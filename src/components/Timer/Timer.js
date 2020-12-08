/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import './Timer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const playIcon = <FontAwesomeIcon icon={faPlay} />;
  const pauseIcon = <FontAwesomeIcon icon={faPause} />;

  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        console.log('tick', seconds);
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [isRunning, seconds]);

  return (
    <div className="timer_container">
      <p>The Relentless March of Time</p>
      <p>useEffect essentially allows us to use a function sometimes</p>
      <h3>{seconds}</h3>
      <button
        className="timer_controls"
        onClick={() => setIsRunning(true)}
        disabled={isRunning}
      >
        {playIcon}
      </button>
      <button
        className="timer_controls"
        onClick={() => setIsRunning(false)}
        disabled={!isRunning}
      >
        {pauseIcon}
      </button>
      <button
        className="reset_button"
        onClick={() => {
          setIsRunning(false);
          setSeconds(0);
        }}
        disabled={!isRunning}
      >
        Reset
      </button>
    </div>
  );
}

export default Timer;
