import React, { useState } from 'react';
import Review from './review';
import ReviewForm from "./reviewForm";
import "./review.scss";


import { useMutation, useQuery } from '@apollo/client';
import { addMovie, getMovieReviewsQuery } from '../../queries/queries';
import { getAverageScore } from '../../helper/calculations';
import { GENRE_LIST } from '../../helper/genres';
import { useDispatch } from 'react-redux';
import { posted } from '../../redux/actions';

export interface ReviewProps{
  movieTitle?: string;
  genreIds?: number[];
  review?: {
    
    score: number;
    comment?: string;
    user?: {
      username: string;
    }
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


  if (data && !reviewsLoaded && !creatingMovie)
  {
    if(data.movie)
    {
      setReviews(data.movie.reviews);
      console.log(data.movie.reviews);
      if(data.movie.reviews.length > 0)setAveScore(getAverageScore(data.movie));
      setMovieId(data.movie.id);
    }
      setReviewsLoaded(true);

  }

  // If the movie isn't in this project's back end, this will be called upon creating a review.
  async function addMoveToDB()
  {
    let genre : string = "";
    if (genreIds) genre = GENRE_LIST[genreIds[0]];
    setCreatingMovie(true);

    console.log("About to add ", movieTitle, genre);
    
    await addMovieMutation({variables:{name:movieTitle, genre:genre}});
    console.log("waiting");
    await sleep(3000);
    console.log("done waiting", mutationResult, movieId);


    if (mutationResult && movieId === "")
    {
      console.log("add movie result", mutationResult)
      if(mutationResult.addMovie){
        setMovieId(mutationResult.addMovie.id);
        return mutationResult.addMovie.id;
      }
    }
    if (mutationError) console.log(mutationError.message);


  }

  const sleep = (milliseconds : any) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  // When the review is successfully added to the db, just add it in here so there's no need to reload.
  function addReview(review: any)
  {
    const revArr : any[] = [...reviews];
    revArr.push(review);
    setReviews([...revArr]);
    setReviewWasPosted(true);   
    dispatch(posted(true))

    // Get new average score?
    let updatedMovie = {reviews: revArr}
    setAveScore(getAverageScore(updatedMovie));
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

         <p style={{textAlign:"center"}}>{
         !reviewsLoaded ? "Checking for reviews..." : ""}</p>
         <p style={{textAlign:"center"}}>{ //Mention if there aren't any reviews for this movie yet after an attempt was made to get them.
         reviews.length === 0 && reviewsLoaded ? "No reviews yet for this movie." : ""}</p>
         
         <br></br><br></br>
         {!reviewWasPosted && <ReviewForm movieTitle={movieTitle} movieId={movieId} createMovieInDB={addMoveToDB} updateReviewArray={addReview} />}
         </div>

     </div>
 );


}

export default ReviewList;