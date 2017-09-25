import axios from 'axios'
import store from '../store'
import { resetStudent } from './student'
import { fetchStudents } from './students'
import { fetchCampuses } from './campuses'

// ACTION NAMES
export const updateStudent = () => dispatch => {
  const { student } = store.getState()

  if (student.id) {
    return axios.put(`/api/students/${student.id}`, { ...student, campusId: student.campusId || null })
      .then(()=> fetchAll(dispatch))
  } 
  return axios.post('/api/students', { ...student, campusId: student.campusId || null })
    .then(()=> fetchAll(dispatch))
}

export const updateCampus = () => dispatch => {
  const { campus } = store.getState()

  if (campus.id) {
    return axios.put(`/api/campuses/${campus.id}`, campus)
      .then(()=> fetchAll(dispatch))
  }
  return axios.post('/api/campuses', campus)
    .then(response=> response.data)
    .then(campus=> {
      fetchAll(dispatch) // async?
      return campus
    })
}

export const deleteStudent = id => dispatch => {
  return axios.delete(`/api/students/${id}`)
    .then(()=> fetchAll(dispatch))
}

export const deleteCampus = id => dispatch => {
  return axios.delete(`/api/campuses/${id}`)
    .then(()=> fetchAll(dispatch))
}

const fetchAll = dispatch => {
  dispatch(fetchStudents())
  dispatch(fetchCampuses())
}
