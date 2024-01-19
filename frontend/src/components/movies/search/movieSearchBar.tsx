import axios from 'axios';
import React, { useEffect, useState } from 'react';

function MovieSearchBar() {
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=cedfb13c7a702ab65870f31a8b84ae6b`
        )
        .then((res) => {
          console.log(res);
          console.log(res.data.results);
        });
    }
  }, [searchQuery]);

  return (
    <React.Fragment>
      <input
        onChange={(e) => {
          setInputText(e.currentTarget.value);
        }}
      ></input>
      <button
        onClick={() => {
          setSearchQuery(inputText);
        }}
      >
        Search
      </button>
    </React.Fragment>
  );
}

export default MovieSearchBar;
