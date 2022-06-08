import React from 'react';
import { useVisible } from 'react-hooks-visible'


import ReviewSection from '../reviews/reviewSection';


import {MovieProps} from "./movieCard";

//A window showing movie information, and reviews. It also will load in stuff from the database.
function MovieDetails(props: MovieProps){

  //Check when this window is visible. If it is, then render the list of movie reviews below.
  const [targetRef, visible] = useVisible();

    return (
      //@ts-ignore: Ignore ref error
      <div ref={targetRef} className="movieBG scroll">
        <div className="movieDetails" >
          <button className="close" onClick={props.closeOnClick}> X </button>
          <h2>{props.movie.title}</h2>
          <p>{props.movie.release_date}</p>
          <img src={"https://image.tmdb.org/t/p/original/" + props.movie.poster_path } alt={props.movie.title} width={167} height={250} />
          <p>{props.movie.overview}</p>
        </div>
        
        {visible && <ReviewSection movieTitle={props.movie.title} genreIds={props.movie.genre_ids}/>} 
      </div>
    );
}

export default MovieDetails;