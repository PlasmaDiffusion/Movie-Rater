import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {getMovieReviewPreviewQuery} from "./../../queries/queries";
import {getAverageScoreStarString} from "../../helper/calculations";

interface Props {
    movieName: string;
}

// Fetches the movie review score and number of reviews.
// Only rendered when the upper MovieCard component is in view.

function MovieReviewPreview({movieName} : Props)
{

    const [reviewCount, setReviewCount] = useState(-1);
    const [averageScore, setAverageScore] = useState("☆☆☆☆☆");
    const [gotPreview, setGotPreview] = useState(false);



    const { loading, error, data } =  useQuery(getMovieReviewPreviewQuery, {
        variables: {name:movieName}
    });
    if (data && !gotPreview)
    {
        console.log(data);
        const movie = data.movie

        if(movie?.reviews && averageScore === "☆☆☆☆☆") setAverageScore(getAverageScoreStarString(movie));
        
        if (movie?.reviews && reviewCount === -1 ) setReviewCount(data.movie.reviews.length);

        setGotPreview(true);
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;


return(<React.Fragment>
    <div key={"movie" + movieName} >
            {/*props.movie.title.length > 50 ? <p className="movieName text-smaller">{props.movie.title}</p> :  ""*/}
            {/*props.movie.title.length > 30 && props.movie.title.length <= 50 ? <p className="movieName text-small">{props.movie.title}</p> :  ""*/}
            {/*props.movie.title.length <= 30 ? <p className="movieName">{props.movie.title}</p> :  ""*/}
            <p className="stars">{averageScore}</p> {/* ★ */}
            {reviewCount === -1 && (<p> 0 reviews</p>)} 
            {reviewCount === 1 && (<p> 1 review</p>)}
            {(reviewCount === 0 || reviewCount > 1) && (<p>{reviewCount} reviews</p>)} 

    </div>
</React.Fragment>);

}

export default MovieReviewPreview;
