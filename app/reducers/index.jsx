import { combineReducers } from 'redux'
import campuses from './campuses'
import campus from './campus'
import students from './students'

const reducer = combineReducers({
  campuses,
  campus,
  students
})

export default reducer
export * from './campuses'
export * from './campus'
export * from './students'
