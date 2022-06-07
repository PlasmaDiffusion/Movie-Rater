import React, { useState } from 'react';
import Review from './review';
import ReviewForm from './reviewForm';
import './review.scss';

import { useQuery } from '@apollo/client';
import { getMovieReviewsQuery } from '../../queries/queries';
import { getAverageScore } from '../../helper/calculations';
import { useDispatch } from 'react-redux';
import { posted } from '../../redux/actions';
import ReviewPageButtons from './reviewPageButtons';

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
}

//Get all reviews for the particular movie, and list them. Also have a form to submit a review at the bottom.
function ReviewList({ movieTitle, genreIds }: ReviewProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [aveScore, setAveScore] = useState(0);
  const [movieId, setMovieId] = useState<string>('');

  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [reviewPage, setReviewPage] = useState(0);

  const [creatingMovie, setCreatingMovie] = useState(false);
  const [reviewWasPosted, setReviewWasPosted] = useState(false);
  const dispatch = useDispatch();

  const { data } = useQuery(getMovieReviewsQuery, {
    variables: { name: movieTitle },
  });

  if (data && !reviewsLoaded && !creatingMovie) {
    if (data.movie) {
      setReviews(data.movie.reviews);
      console.log(data.movie.reviews);
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
      <h2>Average Score: {aveScore}</h2>
      <div className="reviewList">
        {
          //List all reviews here, or at least 10 of them, then display page and arrow buttons
          reviews
            ? reviews
                .slice(reviewPage * 10, reviewPage * 10 + 10)
                .map((review, index) => (
                  <Review review={review} key={movieTitle + 'review' + index} />
                ))
            : ''
        }

        {reviews && reviews.length > 10 && (
          <ReviewPageButtons
            reviewPage={reviewPage}
            reviewLength={reviews.length}
            onClickLeft={() => {
              setReviewPage(reviewPage - 1);
            }}
            onClickRight={() => {
              setReviewPage(reviewPage + 1);
            }}
          />
        )}

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
    </div>
  );
}

export default ReviewList;
