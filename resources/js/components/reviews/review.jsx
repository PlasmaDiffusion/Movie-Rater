import React, { useState, useEffect } from 'react';

//A single review containing a username, star rating and the actual comment (review)
function Review(props)
{

    

 return(
    <div className="review">
        
        <h3>Review by {props.review.reviewerName}</h3>
        <p> ★{props.review.score}/5 </p>
        <p> {props.review.comment} </p>
    
    </div>
 );


}

export default Review;