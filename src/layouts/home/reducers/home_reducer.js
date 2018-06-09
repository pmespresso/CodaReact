import { fetchCrowdsales } from './actions/types';

const initialState = {
  featured_crowdsales: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case fetchCrowdsales:
      return {
        ...state,
        featured_crowdsales: action.payload
      };
    default:
      return state;
  }
}
