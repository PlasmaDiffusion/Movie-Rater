import React, { Component } from "react";
import ReactDOM from "react-dom";
import MovieList from "./components/movies/movieList";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
  } from "@apollo/client";
import "./app.scss";


const client = new ApolloClient({
    uri: process.env.REACT_APP_DATABASE_URL,
    cache: new InMemoryCache()
  });

class App extends Component {
    render() {
        return (
            <div className="App">
                <header> Movie Rater</header>
                <div>
                    <MovieList id={1} category={"Marvel"} />
                    <MovieList id={3} category={"DC"} />
                    <MovieList id={10} category={"Top Grossing Films (as of 2012)"} />
                    <MovieList id={54} category={"Japanese Animated Films"} />
                </div>
                <div style={{ margin: "20px" }}>
                    {/*<ServerTest/>*/}
                </div>

                <footer>
                    This site uses an API from{" "}
                    <a href="https://www.themoviedb.org/">The Movie DB</a>.
                </footer>
            </div>
        );
    }
}



ReactDOM.render(
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>,
    document.getElementById("root")
);


export default App;