import React from 'react';

function SearchBar(props) {
  const { handleInput } = props;
  return (
    <form>
      <input id="dog-search-box" type="text" onChange={handleInput} />
    </form>
  );
}

export default SearchBar;
