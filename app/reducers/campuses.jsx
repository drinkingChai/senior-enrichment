import axios from 'axios'

// ACTION NAMES
const GET_CAMPUSES_FROM_SERVER = 'GET_CAMPUSES_FROM_SERVER'
const DELETE_CAMPUS_FROM_SERVER = 'DELETE_CAMPUS_FROM_SERVER' 

// ACTION CREATORS
const getCampusesFromServer = campuses => {
  return {
    type: GET_CAMPUSES_FROM_SERVER,
    campuses
  }
}

const deleteCampus = id => {
  return {
    type: DELETE_CAMPUS_FROM_SERVER,
    id
  }
}

// THUNK
export const fetchCampuses = () => dispatch => {
  return axios.get('/api/campuses')
    .then(response=> response.data)
    .then(campuses=> dispatch(getCampusesFromServer(campuses)))
}

export const removeCampus = id => dispatch => {
  console.log('called')
  return axios.delete(`/api/campuses/${id}`)
    .then(()=> dispatch(deleteCampus(id)))
}

// REDUCER
export default function reducer (campuses = [], action) {
  switch (action.type) {
    case GET_CAMPUSES_FROM_SERVER:
      return action.campuses
    case DELETE_CAMPUS_FROM_SERVER:
      return campuses.filter(c=> c.id !== action.id * 1)
    default:
      return campuses
  }
}
