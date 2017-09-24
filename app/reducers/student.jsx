import axios from 'axios'
import campuses from './campuses'
import students from './students'

// ACTION NAMES

const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME'
const SET_STUDENT_CAMPUS = 'SET_STUDENT_CAMPUS'
const RESET_STATE = 'RESET_STATE'

// ACTION CREATORS
export const writeStudentName = name => {
  return {
    type: WRITE_STUDENT_NAME,
    name
  }
}

export const setStudentCampus = campusId => {
  return {
    type: SET_STUDENT_CAMPUS,
    campusId
  }
}

export const resetState = () => {
  return {
    type: RESET_STATE
  }
}

// THUNK
export const fetchStudent = id => dispatch => {
  axios.get(`/api/students/${id}`)
    .then(response=> response.data)
    .then(student=> {
      dispatch(writeStudentName(student.name))
      dispatch(setStudentCampus(student.campusId))
    })
}

// REDUCERS
const initialState = {
  name: '',
  campusId: 0 
}

export default function reducer (student = initialState, action) {
  switch (action.type) {
    case WRITE_STUDENT_NAME:
      return { ...student, name: action.name }
    case SET_STUDENT_CAMPUS:
      return { ...student, campusId: action.campusId }
    case RESET_STATE:
      return initialState 
    default:
      return student 
  }
}
