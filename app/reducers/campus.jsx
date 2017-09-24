import axios from 'axios'

// ACTION NAMES

const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME'
const GET_CAMPUS_FROM_SERVER = 'GET_CAMPUS_FROM_SERVER'
const RESET_CAMPUS = 'RESET_CAMPUS'

// ACTION CREATORS
export const writeCampusName = name => {
  return {
    type: WRITE_CAMPUS_NAME,
    name 
  }
}

//export const setStudentCampus = campus => {
  //return {
    //type: SET_STUDENT_CAMPUS,
    //campus
  //}
//}

const getCampusFromServer = campus => {
  return {
    type: GET_CAMPUS_FROM_SERVER,
    campus 
  }
}

export const resetCampus = () => {
  return {
    type: RESET_CAMPUS 
  }
}

// THUNK
export const fetchCampus = id => dispatch => {
  axios.get(`/api/campuses/${id}`)
    .then(response=> response.data)
    .then(campus=> {
      dispatch(getCampusFromServer(campus))
    })
}

const initialState = {
  name: '',
  students: []
}

export default function reducer (campus = initialState, action) {
  switch (action.type) {
    case GET_CAMPUS_FROM_SERVER:
      return action.campus
    case WRITE_CAMPUS_NAME:
      return { ...campus, name: action.name }
    case RESET_CAMPUS:
      return initialState
    default:
      return campus 
  }
}
