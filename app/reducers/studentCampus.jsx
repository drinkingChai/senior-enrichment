import axios from 'axios'
import store from '../store'
import { resetStudent } from './student'
import { fetchStudents } from './students'
import { fetchCampuses } from './campuses'

// ACTION NAMES
export const updateStudent = () => dispatch => {
  const { student } = store.getState()

  if (student.id) {
    // new
    return axios.put(`/api/students/${student.id}`, { ...student, campusId: student.campusId || null })
      .then(response=> response.data)
      .then(student=> {
      })
  } 
  // else
  // update
  return axios.post('/api/students', { ...student, campusId: student.campusId || null })
    .then(response=> response.data)
    .then(student=> {
    })
}
