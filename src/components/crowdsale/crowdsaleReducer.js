/*
  *

*/
import { fetchCrowdsales, NEW_CROWDSALE } from './actions/types';

const initialState = {
  crowdsales: [],
  crowdsale: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case fetchCrowdsales:
      return {
        ...state,
        crowdsales: action.payload
      };
    case NEW_CROWDSALE:
      return {
        ...state,
        crowdsale: action.payload
      };
    default:
      return state;
  }
}
