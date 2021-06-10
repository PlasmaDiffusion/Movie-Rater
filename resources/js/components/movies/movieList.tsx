import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from './movieDetails';
import MovieCard from './movieCard';
import "./movie.scss"

interface ListProps{
  id: number,
  category: string
}

function MovieList(props: ListProps){

    var [movieArray, setMovieArray] = useState([]);
    //var [listDescription, setListDescription] = useState("");


    //Read in lists of movies
    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/list/" + props.id + "?api_key=cedfb13c7a702ab65870f31a8b84ae6b")
        .then(res => {
          setMovieArray(res.data.items);
          //setListDescription(res.data.description);

        })}, []);



    return (<div> <h2>{props.category}</h2>
    <div className="flex-container" >
        {movieArray.map((movie, index) => (
          <MovieCard movie={movie} id={index} key={props.category + index} />
        ))}
    </div>
    </div>);
}

export default MovieList;