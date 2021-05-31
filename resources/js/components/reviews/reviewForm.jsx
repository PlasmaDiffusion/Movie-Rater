import React, { useState, useEffect } from 'react';

import axios from 'axios';

//The form to submit a review at the bottom of the page.
function ReviewForm(props)
{

    //States the froms would change
    const [reviewerName, setName] = useState("");
    const [score, setScore] = useState(3);
    const [comment, setComment] = useState("");


    //OnChange event would be this, but laravel doesn't seem to like the post request axios gives :/
    function submitReview()
    {


        /*let data = {movie_id:7,
        reviewerName:"Ralph",
        score:"2",
        comment: "Villain was weird"}*/

        let data = {
        reviewerName:reviewerName,
        movieName:props.movieTitle,
        score:score,
        comment:comment}

        console.log(data);
        alert(data);
        
        axios.post("api/review", data)
        .then(res => {
            console.log(res.data);
            alert("Submitted");
        })

        
    
    }

    //Click a star and update the score. The render part below will take care of the star output.
    function onClickStar(e)
    {
        console.log(e.target.value);
        setScore(e.target.value);
    }


 return(
     <div className="reviewForm">
        
         <h1>Submit A Review</h1>

        {/*<form method="POST" onSubmit={submitReview}>*/}
        <form method="POST" action="api/review">
            <label >Username </label><br></br>
            <input name="reviewerName" type="text" placeholder="Your name here..." onChange={(e) => setName(e.value)}></input><br></br><br></br>
            <label>Reviewing </label><br></br>
            <input readOnly = {true} type="text" id="movie" name="movieName" value={props.movieTitle} ></input>

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

            <textarea name="comment" rows="4" cols="50" placeholder="Your review here..."></textarea>
            
            <br></br><br></br>

             <input type="submit" />
         </form>

     </div>
 );


}

            /* With onChange states
            <input name="reviewerName" onChange={(e) => setName(e.value)}></input><br></br>
            <label>Reviewing </label>
            <input readOnly = {true} type="text" id="movie" name="movieName" value={props.movieTitle} ></input>

            <div>

                <input type="radio" name="score" id="score1" value="1" onClick={setScore(1)}></input>
                <label className="star">1</label>
                <input type="radio" name="score" id="score2" value="2" onClick={setScore(2)}></input>
                <label className="star">2</label>
                <input type="radio" name="score" id="score3" value="3" onClick={setScore(3)}></input>
                <label className="star">3</label>
                <input type="radio" name="score" id="score4" value="4" onClick={setScore(4)}></input>
                <label className="star">4</label>
                <input type="radio" name="score" id="score5" value="5" onClick={setScore(5)}></input>
                <label className="star">5</label>
            </div>

            <br></br>

            <textarea name="comment" onChange={(e) => setComment(e.value)}></textarea>
            
            <br></br>
            */

export default ReviewForm;