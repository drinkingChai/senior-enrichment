import axios from 'axios'
import store from '../store'
import { fetchAllStudents } from './students'
import { fetchAllCampuses } from './campuses'

export const removeCampusFromStudent = id => dispatch => {
  const student = store.getState().students.find(s=> s.id == id)
  return axios.put(`/api/students/${student.id}`, { ...student, campusId: null })
    .then(()=> {
      dispatch(fetchAllStudents())
      dispatch(fetchAllCampuses())
    })
}

export const addStudentToCampus = (studentId, campusId) => dispatch => {
  // optimisitc
  // can also remove dispatch and do store.dispatch for fetch all
  const student = store.getState().students.find(s=> s.id == studentId)
  return axios.put(`/api/students/${student.id}`, { ...student, campusId })
    .then(()=> {
      dispatch(fetchAllStudents())
      dispatch(fetchAllCampuses())
    })
}
