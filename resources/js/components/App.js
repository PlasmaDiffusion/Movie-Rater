import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ServerAPI_Test from "./serverAPI_Test";
import MovieList from "./movieList";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header> Movie Rater</header>
                <div>
                    <MovieList id={1} category={"Marvel"} />
                    <MovieList id={3} category={"DC"} />
                    <MovieList id={10} category={"Top Grossing Films (2012)"} />
                    <MovieList id={54} category={"Japanese Animated Films"} />
                </div>
                <div>
                    <ServerAPI_Test />
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
}

ReactDOM.render(<App />, document.getElementById("app"));
