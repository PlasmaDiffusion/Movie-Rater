export const postedReducer = (state = 0, action: any) => {
  switch (action.type) {
    case 'POSTED':
      return action.payload;
    default:
      return state;
  }
};


export const searchResultsReducer = (state = [], action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return action.payload;
    case 'CLEAR_SEARCH':
      state = [];
      return state;
    default:
      return state;
  }
};

export default postedReducer;
