import React, { useState } from 'react';
import Review from './review';
import ReviewForm from './reviewForm';
import './review.scss';

import { useQuery } from '@apollo/client';
import { getMovieReviewsQuery } from '../../queries/queries';
import { getAverageScore } from '../../helper/calculations';
import { useDispatch } from 'react-redux';
import { posted } from '../../redux/actions';
import ReviewList from './reviewList';

export interface ReviewProps {
  movieTitle?: string;
  genreIds?: number[];
  review?: {
    score: number;
    comment?: string;
    user?: {
      username: string;
    };
  };

  averageScoreOnTheMovieDB?: number;
  votesOnTheMovieDB?: number;
}

//Get all reviews for the particular movie, and list them. Also have a form to submit a review at the bottom.
function ReviewSection({
  movieTitle,
  genreIds,
  averageScoreOnTheMovieDB,
  votesOnTheMovieDB,
}: ReviewProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [aveScore, setAveScore] = useState(0);
  const [movieId, setMovieId] = useState<string>('');

  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  const [creatingMovie, setCreatingMovie] = useState(false);
  const [reviewWasPosted, setReviewWasPosted] = useState(false);
  const dispatch = useDispatch();

  const { data } = useQuery(getMovieReviewsQuery, {
    variables: { name: movieTitle },
  });

  if (data && !reviewsLoaded && !creatingMovie) {
    if (data.movie) {
      setReviews(data.movie.reviews);
      if (data.movie.reviews.length > 0) setAveScore(getAverageScore(data.movie));
      setMovieId(data.movie.id);
    }
    setReviewsLoaded(true);
  }

  // When the review is successfully added to the db, just add it in here so there's no need to reload.
  function addReview(review: any) {
    const revArr: any[] = [...reviews];
    revArr.push(review);
    setReviews([...revArr]);
    setReviewWasPosted(true);
    dispatch(posted(true));

    // Get new average score?
    let updatedMovie = { reviews: revArr };
    setAveScore(getAverageScore(updatedMovie));
  }

  return (
    <div>
      <div className="theMovieDB">
        <u>Rating On The Movie DB</u>
        <p>
          <i>Average On The Movie DB:</i> {averageScoreOnTheMovieDB} / 10{' '}
        </p>
        <p>
          <i>Votes On The Movie DB:</i> {votesOnTheMovieDB}{' '}
        </p>
      </div>

      <u>Rating On This Site</u>
      <ReviewList aveScore={aveScore} reviews={reviews} movieTitle={movieTitle ? movieTitle : ''} />

      <p style={{ textAlign: 'center' }}>{!reviewsLoaded ? '' : ''}</p>
      <p style={{ textAlign: 'center' }}>
        {
          //Mention if there aren't any reviews for this movie yet after an attempt was made to get them.
          reviews.length === 0 && reviewsLoaded ? 'No reviews yet for this movie.' : ''
        }
      </p>

      <br></br>
      <br></br>
      {!reviewWasPosted && (
        <ReviewForm movieTitle={movieTitle} movieId={movieId} updateReviewArray={addReview} />
      )}
    </div>
  );
}

export default ReviewSection;
