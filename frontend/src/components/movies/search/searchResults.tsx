import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../movieCard';

function SearchResults() {
  const searchResultState = useSelector((state: any) => state.searchResults);
  console.log('*results', searchResultState);

  return (
    <React.Fragment>
      {searchResultState.map((movieResult: any) => (
        <>
          {movieResult.poster_path && (
            <MovieCard movie={movieResult} key={'searchedMovie' + movieResult.id} />
          )}
        </>
      ))}
    </React.Fragment>
  );
}

export default SearchResults;
