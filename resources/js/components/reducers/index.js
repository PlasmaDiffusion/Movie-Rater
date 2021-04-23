import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import movieIdReducer from "./movieId";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    movieId: movieIdReducer,
});

export default allReducers;
