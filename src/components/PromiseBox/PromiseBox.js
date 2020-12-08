import React, { useState, useEffect } from 'react';
import { BounceLoader, BarLoader, BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';

import './PromiseBox.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

function PromiseBox() {
  const [prom1, setProm1] = useState('promise 1 not resolved yet');
  const [loadingProm1, setLoadingProm1] = useState(true);
  const [prom2, setProm2] = useState('promise 2 not resolved yet');
  const [loadingProm2, setLoadingProm2] = useState(true);

  // Promises

  useEffect(() => {
    let isSubscribed = true;
    const p1 = new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve('Promise #1 Resolved.....!!');
        }, 3000);
      } catch (error) {
        reject(error);
      }
    });

    p1.then((values) => {
      console.log(values);
      if (isSubscribed) {
        setProm1(values);
        setLoadingProm1(false);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    const p2 = new Promise(function (resolve, reject) {
      try {
        setTimeout(() => resolve('Promise #2 resolved.....!!'), 10000);
      } catch (error) {
        reject(error);
      }
    });

    p2.then((result) => {
      console.log(result);
      if (isSubscribed) {
        setProm2(result);
        setLoadingProm2(false);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    const p3 = new Promise((resolve, reject) => {
      const a = 1 + 1;
      if (a == 2) {
        resolve('Success');
      } else {
        reject(new Error('failure'));
      }
    });

    p3.then((message) => {
      console.log(`This is in the then ${message}`);
    }).catch((message) => {
      console.error(`This is in the catch ${message}`);
    });
  }, []);

  return (
    <div className="promise_box">
      <BounceLoader color={'blue'} css={override} loading />
      <h2>Promises</h2>
      <div className="promise">
        <BarLoader
          css={override}
          color={'yellow'}
          size={24}
          loading={loadingProm1}
        />
        <p>{prom1}</p>
      </div>
      <div className="promise">
        <BeatLoader
          css={override}
          color={'red'}
          size={48}
          loading={loadingProm2}
        />
        <p>{prom2}</p>
      </div>

      <a href="https://juliangaramendy.dev/use-promise-subscription/">
        Promise Bananas
      </a>
    </div>
  );
}

export default PromiseBox;
