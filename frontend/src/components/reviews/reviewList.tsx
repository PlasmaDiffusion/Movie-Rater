import React, { useState } from "react";
import Review from "./review";
import ReviewPageButtons from "./reviewPageButtons";

interface Props  {
    aveScore: number;
    movieTitle: string;
    reviews: any[];
}

function ReviewList({aveScore, movieTitle, reviews} : Props) {

    const [reviewPage, setReviewPage] = useState(0);


  return (
    <>
      <h2>Average Score: {aveScore}</h2>
      <div className="reviewPage">
        <div className={reviews.length > 10 ? 'trimmedReviewList' : ''}>
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
        </div>

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
      </div>
    </>
  );
}

export default ReviewList;
