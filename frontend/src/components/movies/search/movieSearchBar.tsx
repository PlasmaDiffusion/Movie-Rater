import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchResults, clearSearch } from '../../../redux/actions';
import { MovieProps } from '../movieCard';

function MovieSearchBar() {
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=cedfb13c7a702ab65870f31a8b84ae6b`
        )
        .then((res) => {
          dispatch(setSearchResults(res.data.results));
        });
    } else {
      dispatch(clearSearch());
    }
  }, [dispatch, searchQuery]);

  return (
    <React.Fragment>
      <input
        onChange={(e) => {
          setInputText(e.currentTarget.value);
          setSearchQuery(e.currentTarget.value);
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
