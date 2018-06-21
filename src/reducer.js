import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './containers/user/userReducer'
// import homeReducer from './containers/home/reducers/homeReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer
})

export default reducer
