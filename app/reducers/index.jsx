import { combineReducers } from 'redux'
import axios from 'axios'
import campuses from './campuses'
import students from './students'
import student from './student'
import campus from './campus'

const reducer = combineReducers({
  campuses,
  students,
  student,
  campus
})

export default reducer
export * from './campuses'
export * from './students'
export * from './student'
export * from './campus'
export * from './studentCampus'
