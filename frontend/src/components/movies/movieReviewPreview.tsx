import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getMovieReviewPreviewQuery } from './../../queries/queries';
import { getAverageScoreStarString } from '../../helper/calculations';

interface Props {
  movieName: string;
  averageScoreOnTheMovieDB: number;
  votesOnTheMovieDB: number;
}

// Fetches the movie review score and number of reviews.
// Only rendered when the upper MovieCard component is hovered.

function MovieReviewPreview({ movieName, averageScoreOnTheMovieDB, votesOnTheMovieDB }: Props) {
  const [reviewCount, setReviewCount] = useState(-1);
  const [averageScore, setAverageScore] = useState('☆☆☆☆☆');
  const [gotPreview, setGotPreview] = useState(false);

  const { loading, error, data } = useQuery(getMovieReviewPreviewQuery, {
    variables: { name: movieName },
  });
  if (data && !gotPreview) {
    console.log(data);
    const movie = data.movie;


    setAverageScore(getAverageScoreStarString(movie, averageScoreOnTheMovieDB));

    if (movie?.reviews && reviewCount === -1) setReviewCount(data.movie.reviews.length);

    setGotPreview(true);
  }

  if (loading) return <p>Loading Reviews...</p>;
  if (error) return <p></p>;

  return (
    <React.Fragment>
      <div key={'movie' + movieName}>
        {/*props.movie.title.length > 50 ? <p className="movieName text-smaller">{props.movie.title}</p> :  ""*/}
        {/*props.movie.title.length > 30 && props.movie.title.length <= 50 ? <p className="movieName text-small">{props.movie.title}</p> :  ""*/}
        {/*props.movie.title.length <= 30 ? <p className="movieName">{props.movie.title}</p> :  ""*/}
        <p className="stars">{averageScore}</p> {/* ★ */}
        {reviewCount === -1 && <p> {votesOnTheMovieDB} votes</p>}
        {reviewCount === 1 && <p> 1 review</p>}
        {reviewCount > 1 && <p>{reviewCount} reviews</p>}
      </div>
    </React.Fragment>
  );
}

export default MovieReviewPreview;
