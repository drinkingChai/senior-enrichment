import { combineReducers } from 'redux'
import campus from './campuses'
import students from './students'

const reducer = combineReducers({
  campus,
  students
})

export default reducer
export * from './campuses'
export * from './students'
