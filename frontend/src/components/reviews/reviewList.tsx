import React, { useState, useEffect } from 'react';
import { useVisible } from 'react-hooks-visible'
import Review from './review';
import ReviewForm from "./reviewForm";
import "./review.scss";


import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import { addMovie, getMovieReviewsQuery } from '../../queries/queries';
import { getAverageScore } from '../../helper/calculations';


export interface ReviewProps{
  movieTitle?: string;
  review?: {
    reviewerName: string;
    score: number;
    comment?: string;
  }
}

//Get all reviews for the particular movie, and list them. Also have a form to submit a review at the bottom.
function ReviewList(props: ReviewProps)
{
  //Check when this window is visible.
  const [targetRef, visible] = useVisible();

  const [reviews, setReviews] = useState([]);
  const [aveScore, setAveScore] = useState(0);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  const { loading, error, data } =  useQuery(getMovieReviewsQuery, {
    variables: {name:"Le Movie"}
  });

  const [addMovieMutation] = useMutation(addMovie, {
  });



  if (data && !reviewsLoaded)
  {
    console.log("data:", data);
    if(data.movie.reviews)
    {
      setReviews(data.movie.reviews);
      setAveScore(getAverageScore(data.movie));
      setReviewsLoaded(true);
    }
    
  }
  else
  {
    console.log("Eh");
  }
  
  /*useEffect(() => {

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

  }, [visible])*/


 return(
     <div /*ref={targetRef}*/>
        <h2>Average Score: {aveScore}</h2>
         <div className="reviewList">
         { //Display all 
         reviews ? (
         reviews.map((review, index) => (

            <Review review={review} key={props.movieTitle + "review" + index}/>

         ))) : ""}

         <p style={{textAlign:"center"}}>{ //Loading reviews...
         !reviewsLoaded ? "Checking for reviews..." : ""}</p>
         <p style={{textAlign:"center"}}>{ //Mention if there aren't any reviews for this movie yet.
         reviews.length === 0 && reviewsLoaded ? "No reviews yet for this movie." : ""}</p>
         
         <br></br><br></br>
         <ReviewForm movieTitle={props.movieTitle} />
         </div>

     </div>
 );


}

export default ReviewList;