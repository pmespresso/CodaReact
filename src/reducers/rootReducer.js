import { combineReducers } from 'redux'
import crowdsalesReducer from './crowdsalesReducer'
import { routerReducer } from 'react-router-redux';

// import other reducers

export default combineReducers({
  crowdsales: crowdsalesReducer,
  routing: routerReducer
})
