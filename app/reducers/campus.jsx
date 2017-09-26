import axios from 'axios'

// ACTION NAMES
const GET_CAMPUS_FROM_SERVER = 'GET_CAMPUS_FROM_SERVER'
const RESET_CAMPUS = 'RESET_CAMPUS'
const REMOVE_STUDENT = 'REMOVE_STUDENT'

// ACTION CREATORS
const getCampusFromServer = campus => {
  return {
    type: GET_CAMPUS_FROM_SERVER,
    campus
  }
}

const removeStudent = studentId => {
  return {
    type: REMOVE_STUDENT,
    studentId
  }
}

export const resetCampus = () => {
  return {
    type: RESET_CAMPUS
  }
}

// THUNK
export const fetchCampus = id => dispatch => {
  return axios.get(`/api/campuses/${id}`)
    .then(response=> response.data)
    .then(campus=> dispatch(getCampusFromServer(campus)))
}

export const removeStudentFromCampus = (campus, studentId) => dispatch => {
  const student = campus.students.find(s=> s.id == studentId * 1)
  axios.put(`/api/students/${student.id}`, { ...student, campusId: null })
    .then(response=> response.data)
    .then(()=> dispatch(removeStudent(studentId)))
}

// INITIAL STATE
const initialState = {
  name: '',
  students: []
}

// REDUCER
export default function reducer (campus = initialState, action) {
  switch (action.type) {
    case GET_CAMPUS_FROM_SERVER:
      return action.campus
    case REMOVE_STUDENT:
      return { ...campus, students: campus.students.filter(s=> s.id !== action.studentId * 1) }
    case RESET_CAMPUS:
      return initialState
    default:
      return campus
  }
}
