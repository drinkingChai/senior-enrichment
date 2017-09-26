import axios from 'axios'

// ACTION NAMES
const GET_CAMPUS_FROM_SERVER = 'GET_CAMPUS_FROM_SERVER'
const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
const CREATE_CAMPUS = 'CREATE_CAMPUS'
const RESET_CAMPUS = 'RESET_CAMPUS'
const REMOVE_STUDENT = 'REMOVE_STUDENT'

// ACTION CREATORS
const getCampusFromServer = campus => {
  return {
    type: GET_CAMPUS_FROM_SERVER,
    campus
  }
}

export const writeCampusName = name => {
  return {
    type: WRITE_CAMPUS_NAME,
    name
  }
}

const updateCampus = campus => {
  return {
    type: UPDATE_CAMPUS,
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

export const createCampusOnServer = (campus, history) => dispatch => {
  return axios.post('/api/campuses', campus)
    .then(()=> history.push('/'))
}

export const updateCampusOnServer = (campus) => dispatch => {
  return axios.put(`/api/campuses/${campus.id}`, campus)
    .then(()=> dispatch(updateCampus(campus)))
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
    case WRITE_CAMPUS_NAME:
      return { ...campus, name: action.name }
    case UPDATE_CAMPUS:
      return { ...campus, ...action.campus }
    case REMOVE_STUDENT:
      return { ...campus, students: campus.students.filter(s=> s.id !== action.studentId * 1) }
    case RESET_CAMPUS:
      return initialState
    default:
      return campus
  }
}
