import axios from 'axios'

// ACTION NAMES
const GET_STUDENTS_FROM_SERVER = 'GET_STUDENTS_FROM_SERVER'
const DELETE_STUDENT_FROM_SERVER = 'DELETE_STUDENT_FROM_SERVER'

// ACTION CREATORS
const getStudentsFromServer = students => {
  return {
    type: GET_STUDENTS_FROM_SERVER,
    students 
  }
}

const deleteStudent = id => {
  return {
    type: DELETE_STUDENT_FROM_SERVER,
    id
  }
}

// THUNK
export const fetchStudents = () => dispatch => {
  return axios.get('/api/students')
    .then(response=> response.data)
    .then(students=> dispatch(getStudentsFromServer(students)))
}

export const removeStudent = id => dispatch => {
  return axios.delete(`/api/students/${id}`)
    .then(()=> dispatch(deleteStudent(id)))
}

// REDUCER
export default function reducer (students = [], action) {
  switch (action.type) {
    case GET_STUDENTS_FROM_SERVER:
      return action.students
    case DELETE_STUDENT_FROM_SERVER:
      return students.filter(s=> s.id !== action.id * 1) 
    default:
      return students
  }
}
