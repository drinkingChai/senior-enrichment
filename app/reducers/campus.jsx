import axios from 'axios'

// ACTION NAMES
const GET_CAMPUS_FROM_SERVER = 'GET_CAMPUS_FROM_SERVER'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
const CREATE_CAMPUS = 'CREATE_CAMPUS'
const RESET_CAMPUS = 'RESET_CAMPUS'

// ACTION CREATORS
const getCampusFromServer = campus => {
  return {
    type: GET_CAMPUS_FROM_SERVER,
    campus
  }
}

const updateCampus = campus => {
  return {
    type: UPDATE_CAMPUS,
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
  return axios.get(`/api/campuses/${id}`)
    .then(response=> response.data)
    .then(campus=> dispatch(getCampusFromServer(campus)))
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
    case UPDATE_CAMPUS:
      return { ...campus, ...action.campus }
    case RESET_CAMPUS:
      return initialState
    default:
      return campus
  }
}
