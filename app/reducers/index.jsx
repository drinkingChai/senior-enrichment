import { combineReducers } from 'redux'
import campus from './campuses'
import students from './students'
import studentName from './writeStudent'

const reducer = combineReducers({
  campus,
  students,
  studentName
})

export default reducer
export * from './campuses'
export * from './students'
export * from './writeStudent'
