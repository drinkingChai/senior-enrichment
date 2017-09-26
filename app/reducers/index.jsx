import { combineReducers } from 'redux'
import campuses from './campuses'
import campus from './campus'
import students from './students'
import student from './student'

const reducer = combineReducers({
  campuses,
  campus,
  students,
  student
})

export default reducer
export * from './campuses'
export * from './campus'
export * from './students'
export * from './student'
