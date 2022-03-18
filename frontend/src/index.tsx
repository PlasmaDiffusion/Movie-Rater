import React from "react";
import ReactDOM from "react-dom";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
  } from "@apollo/client";

import { createStore } from "redux";
import allReducers from "../src/redux/reducers";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const client = new ApolloClient({
    uri: process.env.REACT_APP_DATABASE_URL,
    cache: new InMemoryCache(),

  });

const store = createStore(allReducers);


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
