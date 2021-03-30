
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from './movieDetails';

//A card that shows the movie title, star rating, and poster. When clicked this will show its child, MovieDetails.
function MovieCard(props){

    var [movieSelected, setMovieSelected] = useState(false);
    
    function closeDetailsWindow(){setMovieSelected(false);}

return(<React.Fragment>
    <div className="listedMovie" prop={"movie" + props.id} onClick={()=>{setMovieSelected(true)}}>
        {props.movie.title.length > 50 ? <p className="movieName text-smaller">{props.movie.title}</p> :  ""}
        {props.movie.title.length > 30 && props.movie.title.length <= 50 ? <p className="movieName text-small">{props.movie.title}</p> :  ""}
        {props.movie.title.length < 30 ? <p className="movieName">{props.movie.title}</p> :  ""}
      <p className="stars">★★★☆☆</p>
      <img src={"https://image.tmdb.org/t/p/original/" + props.movie.poster_path } width={167} height={250}></img>
    </div>
    <div style={{display:movieSelected ? "block" : "none"}} prop={"movieDetails" + props.id}>
          <MovieDetails movie={props.movie} closeOnClick={closeDetailsWindow} /> {/* To Do: Pass in a function prop for closing? */}
    </div>
</React.Fragment>);

}

export default MovieCard;