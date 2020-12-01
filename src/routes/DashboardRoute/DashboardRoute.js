import React from 'react';
import SampleLoader from '../../components/SampleLoader/SampleLoader';
import PromiseBox from '../../components/PromiseBox/PromiseBox';
import RandomBeep from '../../components/RandomBeep/RandomBeep';

function DashboardRoute() {
  return (
    <section>
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
    </section>
  );
}

export default DashboardRoute;
