import { combineReducers } from 'redux'
import campuses from './campuses'
import campus from './campus'

const reducer = combineReducers({
  campuses,
  campus
})

export default reducer
export * from './campuses'
export * from './campus'
