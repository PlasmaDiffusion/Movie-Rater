import { MovieProps } from "../../components/movies/movieCard";

export const posted = (value : boolean) => {
    return { type: "POSTED", payload: value };
};

export const setSearchResults = (value : MovieProps[]) => {
    return { type: "SET_SEARCH_RESULTS", payload: value };
};

export const clearSearch = () => {
    return { type: "CLEAR_SEARCH" };
};

