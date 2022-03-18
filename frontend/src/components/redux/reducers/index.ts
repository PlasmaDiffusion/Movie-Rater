import postedReducer from "./counter";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    posted: postedReducer,
});

export default allReducers;
