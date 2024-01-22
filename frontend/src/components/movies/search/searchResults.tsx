import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../movieCard';

function SearchResults() {
  const searchResults = useSelector((state: any) => state.searchResults);

  return (
    <React.Fragment>
        {searchResults.length > 0 && <h1>Search Results</h1>}
      {searchResults.map((movieResult: any) => (
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
