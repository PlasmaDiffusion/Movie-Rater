import { MovieProps } from "../../components/movies/movieCard";

export const posted = (value : boolean) => {
    return { type: "POSTED", payload: value };
};

export const searchResults = (value : MovieProps[]) => {
    return { type: "searchResults", payload: value };
};

