import React, { useState, useEffect } from 'react';
import './PromiseBox.css';

function PromiseBox() {
  const [prom1, setProm1] = useState('promise 1 not resolved yet');

  // Promises
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise Resolved.....!!');
    }, 3000);
  });

  useEffect(() => {
    p1.then((values) => {
      console.log(values);
      setProm1(values);
    });
  }, [p1]);

  // const promise = new Promise(function (resolve, reject) {
  //   setTimeout(() => resolve(false), 4000);
  // });

  // promise.then((result) => {
  //   console.log(result);
  // });

  // const p = new Promise((resolve, reject) => {
  //   const a = 1 + 2;
  //   if (a == 2) {
  //     resolve('Success');
  //   } else {
  //     // throw new Error('Failed');
  //     reject(new Error('failure'));
  //   }
  // });

  // p.then((message) => {
  //   console.log(`This is in the then ${message}`);
  // }).catch((message) => {
  //   console.error(`This is in the catch ${message}`);
  // });

  return (
    <div className="promise_box">
      <h2>Promises</h2>
      <p>{prom1}</p>
    </div>
  );
}

export default PromiseBox;
