import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {getReviews, getBooksQuery} from "../queries/queries";
import { useQuery } from "@apollo/client";

function ServerTest(){

    var [movieArray, setMovieArray] = useState([]);



    
    const { loading, error, data } =  useQuery(getReviews);

    console.log(error);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    console.log(data);

    return <div></div>;

    /*useEffect(() => {
        axios.get("api/movies")
        .then(res => {
          //setMovieArray(res.data.items);
            console.log("Movies in DB", res.data);
            console.log("Movies in DB", res.data[0]);

        })}, []); 


        return(<React.Fragment>
            <h1>Reviewed Movies: {movieArray.length} </h1>
        {movieArray.map((movie, index) => (
            <div>
                <h1> {movie.title} </h1>
            </div>
        ))}
        </React.Fragment>
        ); */

}

export default ServerTest;