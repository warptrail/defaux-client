import React from 'react';
import SampleLoader from '../../components/SampleLoader/SampleLoader';
import PromiseBox from '../../components/PromiseBox/PromiseBox';
import RandomBeep from '../../components/RandomBeep/RandomBeep';
import MouseContainer from '../../components/Mouse/MouseContainer';
import Timer from '../../components/Timer/Timer';
import Counter from '../../components/Counter/Counter';

function DashboardRoute() {
  return (
    <section>
      <Timer />
      <SampleLoader
        details={{
          name: 'roy',
          company: 'Ninjas',
          party: 'Democratic',
          location: 'New Jersey'
        }}
      />
      <PromiseBox />
      <RandomBeep />
      <MouseContainer />
      <Counter />
    </section>
  );
}

export default DashboardRoute;
