import axios from 'axios'

// ACTION NAMES

const WRITE_STUDENT = 'WRITE_STUDENT'
const GET_STUDENT = 'GET_STUDENT'

// ACTION CREATORS
export const writeStudent = (studentName) => {
  return {
    type: WRITE_STUDENT,
    studentName
  }
}


// THUNK
export const getStudent = id => dispatch => {
  axios.get(`/api/students/${id}`)
    .then(response=> response.data)
    .then(student=> dispatch(writeStudent(student.name)))
}


// REDUCERS
export default function reducer (studentName = '', action) {
  switch (action.type) {
    case WRITE_STUDENT:
      return action.studentName
    default:
      return studentName
  }
}
