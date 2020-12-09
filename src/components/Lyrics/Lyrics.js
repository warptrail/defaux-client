import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BounceLoader } from 'react-spinners';
import { css } from '@emotion/core';

const Lyrics = () => {
  const [lyricsItem, setLyricsItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const lyricsFunction = async () => {
    try {
      setLoading(true);
      await axios
        .get('https://api.lyrics.ovh/v1/Eminem/Godzilla')
        .then((res) => {
          console.log(res);
          setLyricsItem(res.data.lyrics);
          setLoading(false);
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
      {loading ? <BounceLoader loading /> : ''}
      <p>{lyricsItem}</p>
    </div>
  );
};

export default Lyrics;
