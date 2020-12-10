import React from 'react';
import SampleLoader from '../../components/SampleLoader/SampleLoader';

function MoshRoute() {
  return (
    <div>
      <p>Loading Spinners with Mosh</p>
      <SampleLoader
        details={{
          name: 'roy',
          company: 'Ninjas',
          party: 'Democratic',
          location: 'New Jersey'
        }}
      />
    </div>
  );
}

export default MoshRoute;
