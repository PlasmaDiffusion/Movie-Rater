import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TMDB_API(){

    var [movieArray, setMovieArray] = useState([]);


    //Read in lists of movies
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/list/1?api_key=cedfb13c7a702ab65870f31a8b84ae6b`)
        .then(res => {
          console.log(res);
          setMovieArray(res.data.items);

        })}, []);

    
  
    


    return (<div>
        {movieArray.map((movie, index) => (
    <div className="listedMovie" prop={"movie" + index}>
      <p>{movie.title}</p>
      <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path } width={256} height={256}></img>
    </div>
    ))}
    </div>);
}

export default TMDB_API;