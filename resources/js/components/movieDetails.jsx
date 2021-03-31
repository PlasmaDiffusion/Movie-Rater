import React, { useState, useEffect } from 'react';
import { useVisible } from 'react-hooks-visible'

import axios from 'axios';
import ReviewList from './reviews/reviewList';

//A window showing movie information, and reviews. It also will load in stuff from the database.
function MovieDetails(props){

  //Check when this window is visible.
  const [targetRef, visible] = useVisible();

  //Debug API data on the movie here.
  useEffect(() => {

    if (visible)
    {
      console.log(props.movie);
    }

  }, [visible])

    return (
      <div ref={targetRef} className="movieBG scroll">
        <div className="movieDetails">
          <button onClick={props.closeOnClick}> X </button>
          <h2>{props.movie.title}</h2>
          <p>{props.movie.release_date}</p>
          <img src={"https://image.tmdb.org/t/p/original/" + props.movie.poster_path } width={167} height={250}></img>
          <p>{props.movie.overview}</p>
        </div>
        <ReviewList movieTitle={props.movie.title} />
      </div>
    );
}

export default MovieDetails;