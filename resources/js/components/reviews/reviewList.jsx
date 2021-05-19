import React, { useState, useEffect } from 'react';
import { useVisible } from 'react-hooks-visible'
import Review from './review';
import ReviewForm from "./reviewForm";


//Get all reviews for the particular movie, and list them. Also have a form to submit a review at the bottom.
function ReviewList(props)
{




  //Check when this window is visible.
  const [targetRef, visible] = useVisible();

  const [reviews, setReviews] = useState([]);
  const [aveScore, setAveScore] = useState(0);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  useEffect(() => {

    //Try to load in reviews from the database once this component is visible.
    if (visible && !reviewsLoaded)
    {           
      //axios.get(`api/movie/${props.movieTitle}`)

      axios.get(`api/movie/${props.movieTitle}`)
      .then(res => {
        //setMovieArray(res.data.items);
          console.log(res.data);
          if (res.data.reviews)
          {
          console.log("Reviews: ", res.data.reviews);
          setReviews(res.data.reviews);
          setAveScore(res.data.averageScore);
          }
          setReviewsLoaded(true);

      })

    }

  }, [visible])


 return(
     <div ref={targetRef}>
        <h2>Average Score: {aveScore}</h2>
         <div class="reviewList">
         { //Display all 
         reviews ? (
         reviews.map((review, index) => (

            <Review review={review} key={props.movieTitle + "review" + index}/>

         ))) : ""}

         <p>{ //Mention if there aren't any reviews for this movie yet.
         reviews.length == 0 && reviewsLoaded ? "No reviews yet for this movie." : "Checking for reviews..."}</p>
        <p>{props.movieTitle}</p>
         <ReviewForm movieTitle={props.movieTitle} />
         </div>

     </div>
 );


}

export default ReviewList;