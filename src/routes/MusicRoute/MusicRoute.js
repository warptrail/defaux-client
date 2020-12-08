import React from 'react';
import Lyrics from '../../components/Lyrics/Lyrics';
import Placeholder from '../../components/Lyrics/JsonPlaceholder';

function MusicRoute() {
  return (
    <div>
      <p>The Music</p>
      <Lyrics />
      <Placeholder />
    </div>
  );
}

export default MusicRoute;
