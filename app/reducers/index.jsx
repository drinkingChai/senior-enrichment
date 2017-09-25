import { combineReducers } from 'redux'
import campuses from './campuses'
import students from './students'

const reducer = combineReducers({
  campuses,
  students
})

export default reducer
export * from './campuses'
export * from './students'
