import { MovieProps } from "../../components/movies/movieCard";

export const posted = (value : boolean) => {
    return { type: "POSTED", payload: value };
};

export const searchResults = (value : MovieProps[]) => {
    return { type: "SEARCH_RESULTS", payload: value };
};

export const toggleSearchResultVisibility = () => {
    return { type: "TOGGLE_SEARCH_VISIBILITY" };
};

