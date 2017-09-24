import { combineReducers } from 'redux'
import axios from 'axios'
import campus from './campuses'
import students from './students'
import studentName, { writeStudentName } from './studentName'
import studentCampus, { setStudentCampus } from './studentCampus'

// THUNK
export const fetchStudent = id => dispatch => {
  axios.get(`/api/students/${id}`)
    .then(response=> response.data)
    .then(student=> {
      dispatch(writeStudentName(student.name))
      dispatch(setStudentCampus(student.campusId))
    })
}

const reducer = combineReducers({
  campus,
  students,
  studentName,
  studentCampus
})

export default reducer
export * from './campuses'
export * from './students'
export * from './studentName'
export * from './studentCampus'
