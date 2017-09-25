import axios from 'axios'

// ACTION NAMES
const GET_STUDENTS_FROM_SERVER = 'GET_STUDENTS_FROM_SERVER'

// ACTION CREATORS
const getStudents = students => {
  return {
    type: GET_STUDENTS_FROM_SERVER,
    students
  }
}

// THUNK
export const fetchStudents = () => dispatch => {
  return axios.get('/api/students')
    .then(response=> response.data)
    .then(students=> dispatch(getStudents(students)))
}

// REDUCERS
export default function reducer (students = [], action) {
  switch (action.type) {
    case GET_STUDENTS_FROM_SERVER:
      return action.students
    default:
      return students
  }
}
