const postedReducer = (state = 0, action : any) => {
    switch (action.type) {
        case "POSTED":
            return action.payload;
        default:
            return state;
    }
};

export default postedReducer;
