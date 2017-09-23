import { combineReducers } from 'redux'
import axios from 'axios'

const GOT_CAMPUS_FROM_SERVER = 'GOT_CAMPUS_FROM_SERVER'
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER'
const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME'
const SET_STUDENT_CAMPUS = 'SET_STUDENT_CAMPUS'
const ADD_STUDENT_TO_SERVER = 'ADD_STUDENT_TO_SERVER'
const REMOVE_STUDENT_FROM_SERVER = 'REMOVE_STUDENT_FROM_SERVER'
const UPDATE_STUDENT_ON_SERVER = 'UPDATE_STUDENT_ON_SERVER'

const gotCampusFromServer = (campus)=> {
  return {
    type: GOT_CAMPUS_FROM_SERVER,
    campus
  }
}

const gotStudentsFromServer = (students)=> {
  return {
    type: GOT_STUDENTS_FROM_SERVER,
    students
  }
}

const writeStudentName = (studentNameEntry)=> {
  return {
    type: WRITE_STUDENT_NAME,
    studentNameEntry 
  }
}

const setStudentCampus = (studentCampusId)=> {
  return {
    type: SET_STUDENT_CAMPUS,
    studentCampusId
  }
}

const addStudentToServer = (student)=> {
  return {
    type: ADD_STUDENT_TO_SERVER,
    student 
  }
}

const updateStudentOnServer = (student)=> {
  return {
    type: UPDATE_STUDENT_ON_SERVER,
    student
  }
}

const fetchAllCampus = ()=> {
  return (dispatch)=> {
    axios.get('/api/campus')
    .then(response=> response.data)
    .then(campus=> dispatch(gotCampusFromServer(campus)))
  }
}

const fetchAllStudents = ()=> {
  return (dispatch)=> {
    axios.get('/api/students')
    .then(response=> response.data)
    .then(students=> dispatch(gotStudentsFromServer(students)))
  }
}

const fetchStudentsCampus = ()=> {
  let students
  return Promise.all([
    axios.get('/api/students'),
    axios.get('/api/campus')
  ])
  .then(([ res1, res2 ])=> {
    dispatch(updateStudentOnServer({ students: res1.data, campus: res2.data }))
  })
}

const createNewStudent = (name, campusId)=> {
  campusId = campusId || null
  return (dispatch)=> {
    axios.post('/api/students', { name, campusId })
      .then(response=> response.data)
      .then(student=> dispatch(addStudentToServer(student)))
  }
}

const updateStudent = (studentId, info)=> {
  info.campusId = info.campusId || null
  return (dispatch)=> {
    axios.put(`/api/students/${studentId}`, info)
      .then(fetchStudentsCampus)
      //.then(response=> response.data)
      //.then(student=> dispatch(updateStudentOnServer(student)))
  }
}

const deleteStudent = (studentId)=> {
  return (dispatch)=> {
    axios.delete(`/api/students/${studentId}`)
      .then(response=> response.data)
      .then(student=> dispatch(removeStudentFromServer(student)))
  }
}

const initialState = {
  campus: [],
  students: [],
  studentNameEntry: '',
  studentCampusId: 0 
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GOT_CAMPUS_FROM_SERVER:
      return Object.assign({}, state, { campus: action.campus })
    case GOT_STUDENTS_FROM_SERVER:
      return Object.assign({}, state, { students: action.students })
    case WRITE_STUDENT_NAME:
      return Object.assign({}, state, { studentNameEntry: action.studentNameEntry })
    case SET_STUDENT_CAMPUS:
      return Object.assign({}, state, { studentCampusId: action.studentCampusId * 1 })
    case ADD_STUDENT_TO_SERVER:
      return Object.assign({}, state, { students: [ ...state.students, action.student ], studentNameEntry: '', studentCampusId: 0 })
    case UPDATE_STUDENT_ON_SERVER:
      // replace with refetch from server
      return Object.assign({}, state, { students: action.students, campus: action.campus })
    case REMOVE_STUDENT_FROM_SERVER:
      return Object.assign({}, state, { students: state.students.filter(student=> student.id != action.studentId) })
   default: return state
  }
};

export { 
  fetchAllCampus, 
  fetchAllStudents, 
  writeStudentName, 
  setStudentCampus, 
  createNewStudent, 
  deleteStudent,
  updateStudent
}
export default rootReducer
