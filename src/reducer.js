import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './layouts/user/userReducer'
// import homeReducer from './layouts/home/reducers/homeReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer
})

export default reducer
