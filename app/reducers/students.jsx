import axios from 'axios'

// ACTION NAMES
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS'

// ACTION CREATORS
const getAllStudents = students => {
  return {
    type: GET_ALL_STUDENTS,
    students
  }
}

// THUNK
export const fetchAllStudents = () => dispatch => {
  return axios.get('/api/students')
    .then(response=> response.data)
    .then(students=> dispatch(getAllStudents(students)))
}

// REDUCER
export default function reducer (students = [], action) {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return action.students
    default:
      return students
  }
}
