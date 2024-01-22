export const postedReducer = (state = 0, action: any) => {
  switch (action.type) {
    case 'POSTED':
      return action.payload;
    default:
      return state;
  }
};

const initialSearchState = {
results: [],
isVisible: false,
}

export const searchResultsReducer = (state = initialSearchState, action: any) => {
  switch (action.type) {
    case 'SEARCH_RESULTS':
      return action.payload;
    case 'TOGGLE_SEARCH_VISIBILITY':
      return !state.isVisible;
    default:
      return state;
  }
};

export default postedReducer;
