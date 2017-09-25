import axios from 'axios'
import store from '../store'
import { resetStudent } from './student'
import { fetchStudents } from './students'
import { fetchCampuses } from './campuses'

// ACTION NAMES
export const updateStudent = (history) => dispatch => {
  const { student } = store.getState()

  if (student.id) {
    // update 
    return axios.put(`/api/students/${student.id}`, { ...student, campusId: student.campusId || null })
      .then(response=> response.data)
      .then(()=> {
        fetchAll(dispatch)
      })
  } 
  // else
  // new 
  return axios.post('/api/students', { ...student, campusId: student.campusId || null })
    .then(response=> response.data)
    .then(_student=> {
      fetchAll(dispatch)
      history.push(`/students/${_student.id}`)
    })
}

const fetchAll = dispatch => {
  dispatch(fetchStudents())
  dispatch(fetchCampuses())
}
