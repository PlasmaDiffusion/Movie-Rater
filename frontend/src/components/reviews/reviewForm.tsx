import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { addReview} from "./../../queries/queries";
import {ReviewProps} from "./reviewList";
import UsernameForm from '../users/UsernameForm';

interface Props extends ReviewProps{
    movieId?: string;
    createMovieInDB: () => any;
    updateReviewArray: (arg0: any) => any;

}

//The form to submit a review at the bottom of the page.
function ReviewForm({movieTitle, movieId, createMovieInDB, updateReviewArray}: Props)
{

    const [reviewerName, setReviewerName] = useState("Anonymous");
    const [reviewerId, setReviewerId] = useState("0");

    const [score, setScore] = useState(3);
    const [comment, setComment] = useState("");

    const [reviewAdded, setReviewAdded] = useState(false);

        
    const [addReviewMutation, { data }] = useMutation(addReview);
    
    if (data && !reviewAdded)
    {
        console.log(data);
        updateReviewArray(data.addReview);
        setReviewAdded(true);
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

    async function submitReview(e: React.FormEvent<HTMLInputElement>)
    {
        e.preventDefault();

        //If the movie doesn't exist in the database, add it first.
        let movieIdToAttachTo = movieId;
        if (!movieId) movieIdToAttachTo = await createMovieInDB();


        let data = {
            reviewerId,
            movieTitle,
            movieId,
            score,
            comment}
        console.log("Adding this review: ", data, movieIdToAttachTo);    

        if (!reviewerId || !comment || !score) return; 
        if (!movieIdToAttachTo) {alert("No movie id :("); return;}

        addReviewMutation({variables: {movieId: movieIdToAttachTo, userId: reviewerId, score, comment}});

    }

    //Click a star and update the score. The render part below will take care of the star output.
    function onClickStar(e: React.MouseEvent<HTMLInputElement>)
    {
        console.log(e.currentTarget.value);
        setScore(parseInt(e.currentTarget.value));
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

                <input type="radio" className="invisibleRadio" onClick={onClickStar} name="score" id="score1" value="1" ></input>
                <label className="star">★</label>
                <input type="radio" className="invisibleRadio" onClick={onClickStar} name="score" id="score2" value="2" ></input>
                <label className="star">{score > 1 ? "★" : "☆"}</label>
                <input type="radio" className="invisibleRadio" onClick={onClickStar} name="score" id="score3" value="3" ></input>
                <label className="star">{score > 2 ? "★" : "☆"}</label>
                <input type="radio" className="invisibleRadio" onClick={onClickStar} name="score" id="score4" value="4" ></input>
                <label className="star">{score > 3 ? "★" : "☆"}</label>
                <input type="radio" className="invisibleRadio" onClick={onClickStar} name="score" id="score5" value="5" ></input>
                <label className="star">{score > 4 ? "★" : "☆"}</label>
                <br></br>
                
                <label>{score}/5</label>

                <br></br><br></br>

            </div>

            <br></br>

            <textarea name="comment" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.currentTarget.value)} rows={4} cols={50} placeholder="Your review here..."></textarea>
            
            <br></br><br></br>
             <input type="submit" value={data ? "Submitted" :"Submit"} />
         </form>

     </div>
 );


}

export default ReviewForm;