import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { posted } from '../../redux/actions';
import MovieDetails from './movieDetails';
import MovieReviewPreview from './movieReviewPreview';

//MovieProps will be used both by this and movie details
export interface MovieProps {
  id?: number;
  movie: {
    title: string;
    poster_path: string;
    genre_ids: number[];
    release_date: string;
    overview: string;
    vote_average: number; //Only The Movie DB API's average, not this website
    vote_count: number; //Votes total on The Movie DB
  };
  closeOnClick?: () => void;
  ref?: any;
}

// A card that shows the movie title and poster, plus the star rating and review count when hovered over.
// When clicked this will show its child, MovieDetails.
function MovieCard(props: MovieProps) {
  var [movieSelected, setMovieSelected] = useState(false);
  const [loadedPreview, setLoadedPreview] = useState(false);

  const postedReview = useSelector((state: any) => state.posted);
  const dispatch = useDispatch();

  function openDetailsWindow() {
    setMovieSelected(true);

    //Disable scrolling while fake window is up
    document.body.style.overflow = 'hidden';
  }

  function closeDetailsWindow() {
    // Force a refresh after posting a review and closing the window
    if (postedReview) {
      dispatch(posted(false));
      window.location.reload();
      return;
    }

    setMovieSelected(false);

    //Disable scrolling while fake window is up
    document.body.style.overflow = 'auto';
  }

  function preparePreviewOnHover() {
    if (!loadedPreview) setLoadedPreview(true);
  }

  return (
    <React.Fragment>
      <div
        className="listedMovie"
        key={'movie' + props.id}
        onClick={openDetailsWindow}
        onTouchStart={preparePreviewOnHover}
        onMouseOver={preparePreviewOnHover}
      >
        <div className="showOnHover">
          {loadedPreview && <MovieReviewPreview movieName={props.movie.title} averageScoreOnTheMovieDB={props.movie.vote_average} votesOnTheMovieDB={props.movie.vote_count} />}
        </div>
        <img
          src={'https://image.tmdb.org/t/p/original/' + props.movie.poster_path}
          alt={props.movie.title}
          width={167}
          height={250}
        ></img>
      </div>
      {movieSelected && (
        <div style={{ display: movieSelected ? 'block' : 'none' }} key={'movieDetails' + props.id}>
          <MovieDetails movie={props.movie} closeOnClick={closeDetailsWindow} />
        </div>
      )}
    </React.Fragment>
  );
}

export default MovieCard;
