const initialState = {
  crowdsales: []
}

const crowdsalesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_NEW_CROWDSALE':
      return [
        ...state,
        action.newCrowdsale
      ]
    default:
      return state;
  }
}

export default crowdsalesReducer;
