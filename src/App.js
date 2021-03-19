import "./App.css";
import React, { useState, useEffect } from "react";
import MovieList from "./components/movieList";

function App() {
  /*var [movieArray, setMovieArray] = useState([]);

  useEffect(() => {
    for (let i = 130; i < 150; i++) movieArray.push(i);
  }, []);*/

  return (
    <div className="App">
      <header> Movie Rater</header>
      <div>
        <MovieList id={1} category={"Marvel"} />
        <MovieList id={3} category={"DC"} />
        <MovieList id={10} category={"Top Grossing Films (2012)"} />
        <MovieList id={54} category={"Japanese Animated Films"} />
      </div>
      {/*movieArray.map((item, index) => (
        <div>
          <MovieList id={item} category={item} />
        </div>
      ))*/}
      <footer>
        This site uses an API from{" "}
        <a href="https://www.themoviedb.org/">The Movie DB</a>.
      </footer>
    </div>
  );
}

export default App;
