import axios from 'axios'
import store from '../store'

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

//export const removeCampusFromStudent = id => dispatch => {
  //const student = store.getState().students.find(s=> s.id == id)
  //return axios.put(`/api/students/${student.id}`, { ...student, campusId: null })
    //.then(()=> dispatch(fetchAllStudents()))
  ////console.log(student)
  //dispatch(getAllStudents(store.getState().students))
//}

// REDUCER
export default function reducer (students = [], action) {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return action.students
    default:
      return students
  }
}
