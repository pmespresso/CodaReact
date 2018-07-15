/*
  *

*/
import { FETCH_CROWDSALES_STARTED, FETCH_CROWDSALES_FAILED, FETCH_CROWDSALES_SUCCEEDED, NEW_CROWDSALE_CREATED } from '../actions/crowdsaleActions';

const initialState = {
  active_crowdsales: [
    {
      title: "Yeezus",
      caption: "Kanye West's new album needs some more funding. Ye is mad at The Man. Ye don't want The Man's money. Ye want your help.",
      img: './kanye.jpeg',
      offeringLink: '/kanye_offering_example'
    },
    {
      title: 'Hip Country',
      caption: 'Hip Hop meets country and blended into an summer banger for your trip to Mexico.',
      img: './banjo.jpg',
      offeringLink: '/hipcountry_offering_example'
    },
    {
      title: 'DJ Snake',
      caption: 'William Sami Etienne Grigahcine, known professionally as DJ Snake, is a French DJ and record producer from Paris.',
      img: './dj.jpg',
      offeringLink: '/dj_offering_example'
    },
    {
      title: 'Classical Ballad With a Twist',
      caption: 'An indie band of classical musicians take a new twist because f*** the rules, be creative',
      img: './violin.jpg',
      offeringLink: '/classical_offering_example'
    }
  ],
  fetching: false,
  query: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CROWDSALES_STARTED:
      return {
        ...state,
        fetching: true
      };
    case FETCH_CROWDSALES_FAILED:
      return {
        ...state,
        fetching: false
      };
    case FETCH_CROWDSALES_SUCCEEDED:
      return {
        ...state,
        crowdsales: action.payload
      };
    case NEW_CROWDSALE_CREATED:
      return {
        ...state
      };
    default:
      return state;
  }
}
