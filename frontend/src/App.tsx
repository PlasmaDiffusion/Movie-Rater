import React from "react";
import LoginBar from "./components/users/LoginBar";
import MovieList from "./components/movies/movieList";
import "./app.scss";


function App() {
    
        return (
            <div className="App">
                <header>
                    <>
                <LoginBar/>
                    </>
                </header>
                

                <div>
                    <MovieList id={1} category={"Marvel"} />
                    <MovieList id={3} category={"DC"} />
                    <MovieList id={10} category={"Top Grossing Films (as of 2012)"} />
                    <MovieList id={54} category={"Japanese Animated Films"} />
                </div>

                <footer>
                    This site uses an API from{" "}
                    <a href="https://www.themoviedb.org/">The Movie DB</a>.
                </footer>
            </div>
        );
    
}

export default App;