import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { addMovie, addReview} from "./../../queries/queries";
import {ReviewProps} from "./reviewSection";
import UsernameForm from '../users/UsernameForm';
import { GENRE_LIST } from '../../helper/genres';

interface Props extends ReviewProps{
    movieId?: string;
    genreIds?: number[];
    updateReviewArray: (arg0: any) => any;
}

//The form to submit a review at the bottom of the page.
function ReviewForm({movieTitle, movieId, genreIds, updateReviewArray}: Props)
{

    const [reviewerName, setReviewerName] = useState("Anonymous");
    const [reviewerId, setReviewerId] = useState("622bc939c623a2fd556c9fda"); // Use Anonymous' user id

    const [score, setScore] = useState(3);
    const [comment, setComment] = useState("");

    const [reviewAdded, setReviewAdded] = useState(false);
        
    const [addReviewMutation, { data:addReviewResult, error:addReviewError }] = useMutation(addReview);
    const [addMovieMutation, {data:addMovieResult, error:addMovieError}] = useMutation(addMovie);

    

    if (addReviewResult && !reviewAdded)
    {
        updateReviewArray(addReviewResult.addReview);
        setReviewAdded(true);
    }

    if (addMovieResult)
    {
      if(addMovieResult.addMovie){
        prepareReviewForSending(addMovieResult.addMovie?.id);
      }
    }

    if (addReviewError) console.log(addReviewError.message);
    if (addMovieError) console.log(addMovieError.message);


    // If the movie isn't in this project's back end, this will be called upon creating a review.
    async function addMovieToDB()
    {
      let genre : string = "";
      if (genreIds) genre = GENRE_LIST[genreIds[0]];

      console.log("About to add ", movieTitle, genre);
      
      await addMovieMutation({variables:{name:movieTitle, genre:genre}});
    }

    async function submitReview(e: React.FormEvent<HTMLInputElement>)
    {
        e.preventDefault();
        if (!score || !reviewerId) return;

        //If the movie doesn't exist in the database, add it first.
        if (movieId)prepareReviewForSending(movieId);
        else addMovieToDB();
    }

    function prepareReviewForSending(movieId: string) {addReviewMutation({variables: {movieId, userId: reviewerId, score, comment}});}

    //Click a star and update the score. The render part below will take care of the star output.
    function onClickStar(newScore: number)
    {
        console.log(newScore);
        setScore(newScore);
    }


 return(
     <div className="reviewForm">
         
         <UsernameForm updateUser={(username:string, id: string)=>{setReviewerName(username); setReviewerId(id)}} />
        
         <h1>Submit A Review</h1>

        <form method="POST" onSubmit={(e : any)=>{submitReview(e)}}>
            <label >Posting as <i>{reviewerName}</i> </label><br></br><br></br>
            {reviewerName === "Anonymous" && <><label>(Log in and you can use a username.)</label><br></br><br></br></>}
            <label>Reviewing </label><br></br>
            <input readOnly = {true} type="text" id="movie" name="movieName" value={movieTitle} ></input>

            <div>
                <br></br><br></br>

                <div className='buttonContainer'>
                    <input type="button" name="score" className='starButton' onClick={()=>{onClickStar(1)}}  value={score > 0 ? "★" : "☆"}/>
                    <input type="button" name="score" className='starButton' onClick={()=>{onClickStar(2)}}  value={score > 1 ? "★" : "☆"}/>
                    <input type="button" name="score" className='starButton' onClick={()=>{onClickStar(3)}}  value={score > 2 ? "★" : "☆"}/>
                    <input type="button" name="score" className='starButton' onClick={()=>{onClickStar(4)}}  value={score > 3 ? "★" : "☆"}/>
                    <input type="button" name="score" className='starButton' onClick={()=>{onClickStar(5)}}  value={score > 4 ? "★" : "☆"}/>
                </div>
                <br></br>
                
                <label>{score}/5</label>

                <br></br><br></br>

            </div>

            <br></br>

            <textarea name="comment" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.currentTarget.value)} rows={4} cols={50} placeholder="Your review here..."></textarea>
            
            <br></br><br></br>
             <input type="submit" value={addReviewResult ? "Submitted" :"Submit"} />
         </form>

     </div>
 );


}

export default ReviewForm;