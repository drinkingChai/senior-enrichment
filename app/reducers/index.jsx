import { combineReducers } from 'redux'
import campus from './campuses'
import students from './students'
import student from './student'

const reducer = combineReducers({
  campus,
  students,
  student 
})

export default reducer
export * from './campuses'
export * from './students'
export * from './student'
