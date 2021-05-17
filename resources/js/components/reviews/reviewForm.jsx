import React, { useState, useEffect } from 'react';

import axios from 'axios';

//Get all reviews for the particular movie, and list them. Also have a form to submit a review at the bottom.
function ReviewForm(props)
{

    /*function submitReview(data)
    {
        alert(data.comment);
        console.log(data);

        axios.post("api/review", data)
        .then(res => {
            console.log(res.data);
        })

        
    
    }*/





 return(
     <div className="reviewForm">
        
         <h1>Submit A Review</h1>

         <form method="POST" action="api/review" >
            
            <input name="reviewerName"></input>

            <div>

                <input type="radio" name="score" id="score1" value="1"></input>
                <label className="star">1</label>
                <input type="radio" name="score" id="score2" value="2"></input>
                <label className="star">2</label>
                <input type="radio" name="score" id="score3" value="3"></input>
                <label className="star">3</label>
                <input type="radio" name="score" id="score4" value="4"></input>
                <label className="star">4</label>
                <input type="radio" name="score" id="score5" value="5"></input>
                <label className="star">5</label>
            </div>

            <br></br>

            <textarea name="comment"></textarea>
            
            <br></br>

             <input type="submit" />
         </form>

     </div>
 );


}

export default ReviewForm;