import React, { useState, useEffect } from 'react';


//Get all reviews for the particular movie, and list them. Also have a form to submit a review at the bottom.
function ReviewForm(props)
{





 return(
     <div className="reviewForm">
        
         <h1>Submit A Review</h1>

         <form method="POST">
            
            <input type="radio"></input>
            <span className="star"></span>
            <input type="radio"></input>
            <span className="star"></span>
            <input type="radio"></input>
            <span className="star"></span>
            <input type="radio"></input>
            <span className="star"></span>
            <input type="radio"></input>
            <span className="star"></span>

            <br></br>

            <textarea></textarea>
            
            <br></br>

             <input type="submit" />
         </form>

     </div>
 );


}

export default ReviewForm;