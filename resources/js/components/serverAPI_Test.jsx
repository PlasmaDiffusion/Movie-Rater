import axios from 'axios'
import React, { useState, useEffect } from 'react';

function ServerAPI_Test(props){

    var [movieArray, setMovieArray] = useState([]);

    useEffect(() => {
        axios.get("api/movies")
        .then(res => {
          //setMovieArray(res.data.items);
            console.log("Movies in DB", res.data);
        })}, []);


        return(<React.Fragment>
            <h1>Reviewed Movies: {movieArray.length} </h1>
        {movieArray.map((movie, index) => (
            <div>
                <h1> {movie.title} </h1>
            </div>
        ))}
        </React.Fragment>
        );

}

export default ServerAPI_Test;