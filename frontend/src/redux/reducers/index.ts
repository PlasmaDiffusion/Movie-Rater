import {postedReducer, searchResultsReducer} from "./counter";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    posted: postedReducer,
    searchResults: searchResultsReducer,
});

export default allReducers;
