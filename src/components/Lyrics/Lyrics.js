import React, { useState } from 'react';

function Lyrics() {
  const [lyricsItem, setLyricsItem] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="lyrics_box">
      <p>Lyrics</p>
    </div>
  );
}

export default Lyrics;
