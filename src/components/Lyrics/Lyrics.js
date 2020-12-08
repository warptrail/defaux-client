import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lyrics = () => {
  const [lyricsItem, setLyricsItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const lyricsFunction = async () => {
    try {
      const data = await axios
        .get('https://api.lyrics.ovh/v1/Eminem/Godzilla')
        .then((res) => {
          console.log(res);
          setLyricsItem(res.data.lyrics);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    lyricsFunction();
  }, []);

  return (
    <div className="lyrics_box">
      <p>Lyrics</p>
      <p>{lyricsItem}</p>
    </div>
  );
};

export default Lyrics;
