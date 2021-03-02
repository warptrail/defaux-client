import React, { useState } from 'react';

import DogList from './DogList';
import SearchBar from './SearchBar';

import './Dogs.css';

function Dogs() {
  const dogLibrary = [
    { name: 'Spot', breed: 'Lab' },
    { name: 'Sparky', breed: 'Golden Retriever' },
    { name: 'Rex', breed: 'Boxer' },
    { name: 'Zero', breed: 'Greyhound' }
  ];

  const [dogs, setDogs] = useState(dogLibrary);
  const [searchDog, setSearchDog] = useState('');

  const handleInput = (event) => {
    setSearchDog(event.target.value);
  };

  // filters the dogs in state that contain the value of the search bar
  const filteredDogs = dogs.filter((dog) => {
    return dog.name.toLowerCase().includes(searchDog.toLowerCase());
  });

  // filter the dogs the long way
  const filterMoreDogs = () => {
    let i = 0;
    const filteredArray = [];
    while (i < dogs.length) {
      if (dogs[i].name.toLowerCase().includes(searchDog.toLowerCase())) {
        filteredArray.push(dogs[i]);
      }
      i++;
    }
    return filteredArray;
  };

  return (
    <div className="dog-app">
      <SearchBar handleInput={handleInput} />
      <DogList data={filterMoreDogs()} />
    </div>
  );
}

export default Dogs;
