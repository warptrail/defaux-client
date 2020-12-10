import React from 'react';

import PromiseBox from '../../components/PromiseBox/PromiseBox';
import RandomBeep from '../../components/RandomBeep/RandomBeep';
import MouseContainer from '../../components/Mouse/MouseContainer';

function DashboardRoute() {
  return (
    <section>
      <PromiseBox />
      <RandomBeep />
      <MouseContainer />
    </section>
  );
}

export default DashboardRoute;
