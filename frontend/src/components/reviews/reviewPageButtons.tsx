import React, { useMemo } from 'react';

import './review.scss';

export interface Props {
  reviewPage: number;
  reviewLength: number;

  onClickLeft: () => void;
  onClickRight: () => void;
}

//Basic navigation component with page number, total number of items, and arrow buttons
function ReviewPageButtons({ reviewPage, reviewLength, onClickLeft, onClickRight }: Props) {
  const totalPages = useMemo(() => {
    return Math.ceil(reviewLength / 10);
  }, [reviewLength]);

  return (
    <>
      <div className="reviewPageButtons">
        <button
          onClick={() => {
            if (reviewPage > 0) onClickLeft();
          }}
        >
          ◄
        </button>

        <p>
          {reviewPage + 1}/{totalPages}
        </p>
        
        <button
          onClick={() => {
            if (reviewPage < totalPages-1) onClickRight();
          }}
        >
          ►
        </button>
      </div>
    </>
  );
}

export default ReviewPageButtons;
