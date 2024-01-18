import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './movieCard';
import './movie.scss';

interface ListProps {
  id: number;
  category: string;
}

function MovieList(props: ListProps) {
  var [movieArray, setMovieArray] = useState([]);
  var [scrollTarget, setScrollTarget] = useState(0);

  var [refs, setRefs] = useState<any[]>([]);

  //Read in lists of movies
  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/list/' +
          props.id +
          '?api_key=cedfb13c7a702ab65870f31a8b84ae6b'
      )
      .then((res) => {
        setMovieArray(res.data.items);
        //setListDescription(res.data.description);
      });
  }, []);

  const saveThisRef = (element: any) => {
    refs.push(element);
    setRefs(refs);
  };

  function onClickScroll(e: any) {
    setScrollTarget(scrollTarget + 1);
    console.log(scrollTarget);

    if (refs[scrollTarget]) {
      console.log(refs[scrollTarget]);
      refs[scrollTarget].focus();
      refs[scrollTarget].current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }

  return (
    <div className="movieList">
      <h2>{props.category}</h2>
      <div className="movieRow">
        <button onClick={onClickScroll}> - </button>
        <div className="flex-container">
          {movieArray.map((movie, index) => (
            <MovieCard movie={movie} ref={saveThisRef} key={props.category + index} />
          ))}
        </div>
        <button onClick={onClickScroll}> - </button>
      </div>
    </div>
  );
}

export default MovieList;
