import axios from 'axios'
import campuses from './campuses'

// ACTION NAMES

const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME'
const SET_STUDENT_CAMPUS = 'SET_STUDENT_CAMPUS'
const GET_STUDENT = 'GET_STUDENT'
//const UPDATE_STUDENT = 'UPDATE_STUDENT'
const RESET_STUDENT = 'RESET_STUDENT'

// ACTION CREATORS
export const writeStudentName = name => {
  return {
    type: WRITE_STUDENT_NAME,
    name 
  }
}

//export const updateStudent = stateProp => {
  //return {
    //type: UPDATE_STUDENT,
    //stateProp
  //}
//}

export const setStudentCampus = campusId => {
  return {
    type: SET_STUDENT_CAMPUS,
    campusId 
  }
}

const getStudent = student => {
  return {
    type: GET_STUDENT,
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
      dispatch(getStudent(student))
    })
}

const initialState = {
  name: '',
  campus: {},
  campusId: 0
}

export default function reducer (student = initialState, action) {
  switch (action.type) {
    case GET_STUDENT:
      return action.student
    //case UPDATE_STUDENT:
      //const { name, value } = action.stateProp
      //const toModify = {}
      //toModify[name] = value
      //return { ...student, ...toModify }
    case WRITE_STUDENT_NAME:
      return { ...student, name: action.name }
    case SET_STUDENT_CAMPUS:
      return { ...student, campusId: action.campusId }
    case RESET_STUDENT:
      return initialState
    default:
      return student 
  }
}
