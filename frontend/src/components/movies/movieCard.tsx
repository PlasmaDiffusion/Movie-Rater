import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useVisible } from 'react-hooks-visible';
import { useDispatch, useSelector } from 'react-redux';
import { posted } from '../../redux/actions';
import MovieDetails from './movieDetails';
import MovieReviewPreview from './movieReviewPreview';

//MovieProps will be used both by this and movie details
export interface MovieProps  {

    id?: number;
    movie: {
        title: string;
        poster_path: string;
        genre_ids: number[];
        release_date: string;
        overview: string;
    }
    closeOnClick?: ()=>void;
}


// A card that shows the movie title and poster, plus the star rating and review count when hovered over.
// When clicked this will show its child, MovieDetails.
function MovieCard(props: MovieProps){

    var [movieSelected, setMovieSelected] = useState(false);
    const [loadedPreview, setLoadedPreview] = useState(false);

    
    const postedReview = useSelector((state : any) => state.posted);
    const dispatch = useDispatch();
    console.log(postedReview);
 
    
    function openDetailsWindow()
    {
        setMovieSelected(true);

        //Disable scrolling while fake window is up
        document.body.style.overflow = "hidden";
    }

    function closeDetailsWindow()
    {
        // Force a refresh after posting a review and closing the window
        if (postedReview)
        {
            dispatch(posted(false))
            window.location.reload();
            return;
        }

        setMovieSelected(false);

        //Disable scrolling while fake window is up
        document.body.style.overflow = "auto";
    }

    function preparePreviewOnHover()
    {
        if(!loadedPreview) setLoadedPreview(true)
    }

return(<React.Fragment>
    <div className="listedMovie" key={"movie" + props.id} onClick={openDetailsWindow} onTouchStart={preparePreviewOnHover} onMouseOver={preparePreviewOnHover} >
        <div className="showOnHover" >
            {/*props.movie.title.length > 50 ? <p className="movieName text-smaller">{props.movie.title}</p> :  ""*/}
            {/*props.movie.title.length > 30 && props.movie.title.length <= 50 ? <p className="movieName text-small">{props.movie.title}</p> :  ""*/}
            {/*props.movie.title.length <= 30 ? <p className="movieName">{props.movie.title}</p> :  ""*/}
            {loadedPreview && (<MovieReviewPreview movieName={props.movie.title} />)}

        </div>
      <img src={"https://image.tmdb.org/t/p/original/" + props.movie.poster_path } alt={props.movie.title} width={167} height={250}></img>
    </div>
    {movieSelected &&
    <div style={{display:movieSelected ? "block" : "none"}} key={"movieDetails" + props.id}>
           <MovieDetails movie={props.movie} closeOnClick={closeDetailsWindow} />
    </div>}
</React.Fragment>);

}

export default MovieCard;