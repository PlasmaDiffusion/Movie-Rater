import React, { useState, useEffect } from 'react';

import {ReviewProps} from "./reviewList";


//A single review containing a username, star rating and the actual comment (review)
function Review(props: ReviewProps)
{

 return(
     <React.Fragment>
    {props.review ?(
    <div className="review">
        
        <h3>Review by {props.review.reviewerName}</h3>
        <p> ★{props.review.score}/5 </p>
        <p> {props.review.comment} </p>
    
    </div> ): ""}
    </React.Fragment>
 );


}

export default Review;