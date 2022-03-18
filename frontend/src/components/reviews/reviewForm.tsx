import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { addReview} from "./../../queries/queries";
import {ReviewProps} from "./reviewList";

interface Props extends ReviewProps{
    movieId?: string;
    createMovieInDB: () => any;
    updateReviewArray: (arg0: any) => any;

}

//The form to submit a review at the bottom of the page.
function ReviewForm({movieTitle, movieId, createMovieInDB, updateReviewArray}: Props)
{

    const [reviewerName, setName] = useState("");
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

    async function submitReview(e: React.FormEvent<HTMLInputElement>)
    {
        e.preventDefault();

        //If the movie doesn't exist in the database, add it first.
        let movieIdToAttachTo = movieId;
        if (!movieId) movieIdToAttachTo = await createMovieInDB();


        let data = {
            reviewerName:reviewerName,
            movieName:movieTitle,
            score:score,
            comment:comment}
        console.log("Adding this review: ", data, movieIdToAttachTo);    

        addReviewMutation({variables: {movieId: movieIdToAttachTo, userId:"622bc939c623a2fd556c9fda", score, comment}});

    }

    //Click a star and update the score. The render part below will take care of the star output.
    function onClickStar(e: React.MouseEvent<HTMLInputElement>)
    {
        console.log(e.currentTarget.value);
        setScore(parseInt(e.currentTarget.value));
    }


 return(
     <div className="reviewForm">
        
         <h1>Submit A Review</h1>

        <form method="POST" onSubmit={(e : any)=>{submitReview(e)}}>
            <label >Username </label><br></br>
            <input name="reviewerName" type="text" placeholder="Your name here..." onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}></input><br></br><br></br>
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