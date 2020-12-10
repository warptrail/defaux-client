import React from 'react';
import ClickCounter from '../../components/Counter/ClickCounter';
import Counter from '../../components/Counter/Counter';
import MountTimer from '../../components/Timer/MountTimer';
import Timer from '../../components/Timer/Timer';

function TimeRoute() {
  return (
    <div>
      <h2>Time is marching on</h2>
      <ClickCounter />
      <Counter />
      <MountTimer />
      <Timer />
    </div>
  );
}

export default TimeRoute;
