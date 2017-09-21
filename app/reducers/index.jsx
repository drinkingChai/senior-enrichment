import { combineReducers } from 'redux'
import axios from 'axios'

const GOT_CAMPUS_FROM_SERVER = 'GOT_CAMPUS_FROM_SERVER'
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER'

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

const initialState = {
  campus: [],
  students: []
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GOT_CAMPUS_FROM_SERVER:
      return Object.assign({}, state, { campus: action.campus })
    case GOT_STUDENTS_FROM_SERVER:
      return Object.assign({}, state, { students: action.students })
    default: return state
  }
};

export { fetchAllCampus, fetchAllStudents }
export default rootReducer
