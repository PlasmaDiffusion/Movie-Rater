import React, { Component } from "react";
import ReactDOM from "react-dom";
import MovieList from "./components/movies/movieList";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
  } from "@apollo/client";
import "./app.scss";

import { createStore } from "redux";
import allReducers from "../src/redux/reducers";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

const client = new ApolloClient({
    uri: process.env.REACT_APP_DATABASE_URL,
    cache: new InMemoryCache(),

  });

const store = createStore(allReducers);

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
    <Provider store={store}>
    <Auth0Provider
    domain="dev-hitqxx5e.us.auth0.com"
    clientId="Lgi9Rq7cwWfSB2jZJ8FEUgoj4iLIyjp1"
    redirectUri={window.location.origin}>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    </Auth0Provider>
    </Provider>,
    document.getElementById("root")
);


export default App;