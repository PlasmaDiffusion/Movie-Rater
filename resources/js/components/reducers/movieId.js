//Basic that
const movieIdReducer = (state = 0, action) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        default:
            return state;
    }
};

export default movieIdReducer;
