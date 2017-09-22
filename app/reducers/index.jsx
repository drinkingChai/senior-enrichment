import { combineReducers } from 'redux'
import axios from 'axios'

const GOT_CAMPUS_FROM_SERVER = 'GOT_CAMPUS_FROM_SERVER'
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER'
const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME'
const SET_STUDENT_CAMPUS = 'SET_STUDENT_CAMPUS'
const ADD_STUDENT_TO_SERVER = 'ADD_STUDENT_TO_SERVER'
const REMOVE_STUDENT_FROM_SERVER = 'REMOVE_STUDENT_FROM_SERVER'

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

const setStudentCampus = (studentChannelId)=> {
  return {
    type: SET_STUDENT_CAMPUS,
    studentChannelId
  }
}

const addStudentToServer = (student)=> {
  return {
    type: ADD_STUDENT_TO_SERVER,
    student 
  }
}

const removeStudentFromServer = (studentId)=> {
  return {
    type: REMOVE_STUDENT_FROM_SERVER,
    studentId
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

const createNewStudent = (name, campusId)=> {
  campusId = campusId || null
  return (dispatch)=> {
    axios.post('/api/students', { name, campusId })
      .then(response=> response.data)
      .then(student=> dispatch(addStudentToServer(student)))
  }
}

const deleteStudent = (studentId)=> {
  return (dispatch)=> {
    axios.delete(`/api/students/${studentId}`)
      .then(response=> response.data)
      .then(student=> dispatch(removeStudentFromServer(studentId)))
  }
}

const initialState = {
  campus: [],
  students: [],
  studentNameEntry: '',
  studentChannelId: 0 
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
      return Object.assign({}, state, { studentChannelId: action.studentChannelId * 1 })
    case ADD_STUDENT_TO_SERVER:
      return Object.assign({}, state, { students: [ ...state.students, action.student ], studentNameEntry: '', studentChannelId: 0 })
    case REMOVE_STUDENT_FROM_SERVER:
      return Object.assign({}, state, { students: state.students.filter(student=> student.id != action.studentId) })
    default: return state
  }
};

export { fetchAllCampus, fetchAllStudents, writeStudentName, setStudentCampus, createNewStudent, deleteStudent }
export default rootReducer
