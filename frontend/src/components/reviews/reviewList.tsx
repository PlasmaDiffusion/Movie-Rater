import React, { useState } from 'react';
import Review from './review';
import ReviewForm from "./reviewForm";
import "./review.scss";


import { useMutation, useQuery } from '@apollo/client';
import { addMovie, getMovieReviewsQuery } from '../../queries/queries';
import { getAverageScore } from '../../helper/calculations';
import { GENRE_LIST } from '../../helper/genres';
import { useDispatch } from 'react-redux';
import { posted } from '../redux/actions';

export interface ReviewProps{
  movieTitle?: string;
  genreIds?: number[];
  review?: {
    reviewerName: string;
    score: number;
    comment?: string;
  }
}

//Get all reviews for the particular movie, and list them. Also have a form to submit a review at the bottom.
function ReviewList({movieTitle, genreIds}: ReviewProps)
{

  const [reviews, setReviews] = useState<any[]>([]);
  const [aveScore, setAveScore] = useState(0);
  const [movieId, setMovieId] = useState<string>("");


  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [creatingMovie, setCreatingMovie] = useState(false);
  const [reviewWasPosted, setReviewWasPosted] = useState(false);
  const dispatch = useDispatch();


  const { data } =  useQuery(getMovieReviewsQuery, {
    variables: {name:movieTitle}
  });

  const [addMovieMutation, {data:mutationResult, error:mutationError}] = useMutation(addMovie);


  console.log("data:", data);
  if (data && !reviewsLoaded && !creatingMovie)
  {
    if(data.movie)
    {
      setReviews(data.movie.reviews);
      if(data.movie.reviews.length > 0)setAveScore(getAverageScore(data.movie));
      setMovieId(data.movie.id);
      setReviewsLoaded(true);
      console.log("movie loaded ");
    }

  }

  async function addMoveToDB()
  {
    let genre : string = "";
    if (genreIds) genre = GENRE_LIST[genreIds[0]];
    setCreatingMovie(true);
    
    await addMovieMutation({variables:{name:movieTitle, genre:genre}});
    
  if (mutationResult && creatingMovie && !movieId)
  {
    console.log("add movie result", mutationResult);
    if(mutationResult.addMovie){
      return mutationResult.addMovie.id;
    }
  }
  if (mutationError) console.log(mutationError.message);

  }

  // When the review is successfully added to the db, just add it in here so there's no need to reload.
  function addReview(review: any)
  {
    const revArr : any[] = [...reviews];
    revArr.push(review);
    setReviews([...revArr]);
    setReviewWasPosted(true);   
    dispatch(posted(true))
  }


 return(
     <div>
        <h2>Average Score: {aveScore}</h2>
         <div className="reviewList">
         { //Display all 
         reviews ? (
         reviews.map((review, index) => (

            <Review review={review} key={movieTitle + "review" + index}/>

         ))) : ""}

         <p style={{textAlign:"center"}}>{ //Loading reviews...
         !reviewsLoaded ? "Checking for reviews..." : ""}</p>
         <p style={{textAlign:"center"}}>{ //Mention if there aren't any reviews for this movie yet.
         reviews.length === 0 && reviewsLoaded ? "No reviews yet for this movie." : ""}</p>
         
         <br></br><br></br>
         {!reviewWasPosted && <ReviewForm movieTitle={movieTitle} movieId={movieId} createMovieInDB={addMoveToDB} updateReviewArray={addReview} />}
         </div>

     </div>
 );


}

export default ReviewList;