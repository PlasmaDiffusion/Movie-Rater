import { searchResults } from "../actions";
import postedReducer from "./counter";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    posted: postedReducer,
    searchResults: searchResults,
});

export default allReducers;
