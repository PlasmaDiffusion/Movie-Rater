import React, { useState, useEffect } from 'react';
import { useVisible } from 'react-hooks-visible'


//import {useSelector, useDispatch} from 'react-redux';
//import {setMovieId} from './actions';

import axios from 'axios';
import ReviewList from '../reviews/reviewList';


import {MovieProps} from "./movieCard";

//A window showing movie information, and reviews. It also will load in stuff from the database.
function MovieDetails(props: MovieProps){

  //Check when this window is visible.
  const [targetRef, visible] = useVisible();
  var [height, setHeight] = useState("");


  //Redux state
  //const currentMovieId = useSelector(state => state.movieId);
  //const dispatch = useDispatch();

  //Debug API data on the movie here.
  useEffect(() => {

    if (visible)
    {
      //console.log(props.movie);

      //Make movie details window higher if the description is long
      setHeight(props.movie.overview.length > 400 ? "90%" : "70%" )

      //dispatch(setMovieId(props.movie.id));
      //console.log(getState());
    }

  }, [visible])

    return (
      <div /*ref={targetRef}*/ className="movieBG scroll">
        <div className="movieDetails" style={{height: height}}>
          <button className="close" onClick={props.closeOnClick}> X </button>
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