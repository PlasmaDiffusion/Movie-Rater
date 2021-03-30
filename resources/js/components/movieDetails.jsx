import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieDetails(props){


    return (<div className="movieDetails">
      <button onClick={props.closeOnClick}> X </button>
      <h2>{props.movie.title}</h2>
      <p>{props.movie.release_date}</p>
      <p>{props.movie.description}</p>
    </div>);
}

export default MovieDetails;