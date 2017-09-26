import axios from 'axios'

// ACTION NAMES
const GET_STUDENT_FROM_SERVER = 'GET_STUDENT_FROM_SERVER'
const ADD_STUDENT_CAMPUS = 'ADD_STUDENT_CAMPUS'
const REMOVE_STUDENT_CAMPUS = 'REMOVE_STUDENT_CAMPUS'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const CREATE_STUDENT = 'CREATE_STUDENT'
const RESET_STUDENT = 'RESET_STUDENT'

// ACTION CREATORS
const getStudentFromServer = student => {
  return {
    type: GET_STUDENT_FROM_SERVER,
    student
  }
}

const updateStudent = student => {
  return {
    type: UPDATE_STUDENT,
    student
  }
}

const addCampus = campusId => {
  return {
    type: ADD_STUDENT_CAMPUS,
    campusId
  }
}

const removeCampus = () => {
  return {
    type: REMOVE_STUDENT_CAMPUS,
  }
}

export const resetStudent = () => {
  return {
    type: RESET_STUDENT
  }
}

// THUNK
export const fetchStudent = id => dispatch => {
  return axios.get(`/api/students/${id}`)
    .then(response=> response.data)
    .then(student=> dispatch(getStudentFromServer(student)))
}

export const createStudentOnServer = (student, history) => dispatch => {
  return axios.post('/api/students', student)
    .then(response=> response.data)
    .then(_student=> history.push(`/students/${_student.id}`))
}

export const addStudentCampus = (student, campusId) => dispatch => {
  return axios.put(`/api/students/${student.id}`, { ...student, campusId })
    .then(response=> response.data)
    .then(student=> dispatch(addCampus()))
}

export const removeStudentCampus = student => dispatch => {
  return axios.put(`/api/students/${student.id}`, { ...student, campusId: null })
    .then(response=> response.data)
    .then(student=> dispatch(removeCampus()))
}

export const updateStudentOnServer = student => dispatch => {
  return axios.put(`/api/students/${student.id}`, student)
    .then(()=> dispatch(updateStudent(student)))
}

// INITIAL STATE
const initialState = {
  name: ''
}

// REDUCER
export default function reducer (student = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_FROM_SERVER:
      return action.student
    case UPDATE_STUDENT:
      return { ...student, ...action.student }
    case ADD_STUDENT_CAMPUS:
      return { ...student, campusId: action.campusId }
    case REMOVE_STUDENT_CAMPUS:
      return { ...student, campus: {}, campusId: null }
    case RESET_STUDENT:
      return initialState
    default:
      return student
  }
}
