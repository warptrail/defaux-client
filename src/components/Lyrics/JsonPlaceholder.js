import React, { useState, useEffect } from 'react';
import axios from 'axios';

const testObjects = [
  {
    id: 1,
    name: 'ooga'
  },
  {
    id: 2,
    name: 'booga'
  },
  {
    id: 3,
    name: 'looga'
  },
  {
    id: 4,
    name: 'omooga'
  }
];

function JsonPlaceholder() {
  const [placeholder, setPlaceholder] = useState([]);
  const [loading, setLoading] = useState(false);

  const placeholderFunction = async () => {
    try {
      setLoading(true);
      await axios
        .get('https://jsonplaceholder.typicode.com/albums/1/photos')
        .then((res) => {
          console.log(res.data);
          setPlaceholder(res.data);

          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    placeholderFunction();
  }, []);

  // useEffect(() => {
  //   let count = 0;
  //   const x = setInterval(() => {
  //     if (count <= 49) {
  //       let newArray = [...placeholder, tank[count].title];
  //       setPlaceholder(newArray);
  //       count = count + 1;
  //     }
  //     console.log('eee');
  //   }, 200);
  //   if (count === 49) {
  //     return clearInterval(x);
  //   }
  // }, []);

  const renderTestData = () => {
    return testObjects.map((o) => {
      return (
        <div key={o.id}>
          {o.id} - {o.name}
        </div>
      );
    });
  };

  const renderApiData = () => {
    return placeholder.map((item) => <h2 key={item.title}>{item.title}</h2>);
  };

  return (
    <div>
      <p>Placeholder</p>
      {loading ? 'loading' : ''}
      {renderTestData()}
      {renderApiData()}
    </div>
  );
}

export default JsonPlaceholder;
