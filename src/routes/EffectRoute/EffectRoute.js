import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const lib = [
  'cool',
  'fast',
  'hawk',
  'communication',
  'level',
  'advice',
  'life',
  'skills',
  'antimatter',
  'sonic',
  'greenery',
  'lark'
];

function EffectRoute() {
  const [arr, setArr] = useState([]);
  const [lir, setLir] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (arr.length < 200) {
      const interval = setInterval(() => {
        setArr([...arr, Math.floor(Math.random() * 100)]);
      }, 50);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [arr]);

  useEffect(() => {
    if (lir.length !== lib.length) {
      const interval = setInterval(() => {
        setLir([...lir, lib[count]]);
      }, 1000);
      setCount((c) => count + 1);
      console.log(lir);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [lir]);

  const renderCoffees = () => {
    let c = count;
    let arrayOfIcons = [];
    for (let i = 0; i < c; i++) {
      arrayOfIcons.push(<FontAwesomeIcon key={i} icon={faCoffee} />);
    }
    return arrayOfIcons;
  };

  renderCoffees();
  return (
    <div>
      <h3>The Effects of Time</h3>
      <div>
        <p>coffee</p>
        {renderCoffees()}
      </div>
      {lir.map((l, i) => (
        <span key={i}>{l}</span>
      ))}
      {arr.map((a, i) => (
        <span key={i}>{a} -- </span>
      ))}
    </div>
  );
}

export default EffectRoute;
