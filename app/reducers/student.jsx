import axios from 'axios'

// ACTION NAMES

const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME'
const SET_STUDENT_CAMPUS = 'SET_STUDENT_CAMPUS'
const GET_STUDENT_FROM_SERVER = 'GET_STUDENT_FROM_SERVER'
const RESET_STUDENT = 'RESET_STUDENT'

// ACTION CREATORS
export const writeStudentName = name => {
  return {
    type: WRITE_STUDENT_NAME,
    name 
  }
}

export const setStudentCampus = campus => {
  return {
    type: SET_STUDENT_CAMPUS,
    campus
  }
}

const getStudentFromServer = student => {
  return {
    type: GET_STUDENT_FROM_SERVER,
    student
  }
}

export const resetStudent = () => {
  return {
    type: RESET_STUDENT
  }
}

// THUNK
export const fetchStudent = id => dispatch => {
  axios.get(`/api/students/${id}`)
    .then(response=> response.data)
    .then(student=> {
      dispatch(getStudentFromServer(student))
    })
}

const initialState = {
  name: '',
  campus: {}
}

export default function reducer (student = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_FROM_SERVER:
      return action.student
    case WRITE_STUDENT_NAME:
      return { ...student, name: action.name }
    case SET_STUDENT_CAMPUS:
      return { ...student, campus: action.campus }
    case RESET_STUDENT:
      return initialState
    default:
      return student 
  }
}
