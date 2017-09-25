import axios from 'axios'

// ACTION NAMES
const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES'

// ACTION CREATORS
const getAllCampuses = campuses => {
  return {
    type: GET_ALL_CAMPUSES,
    campuses
  }
}

// THUNK
export const fetchAllCampuses = () => dispatch => {
  return axios.get('/api/campuses')
    .then(response=> response.data)
    .then(campuses=> dispatch(getAllCampuses(campuses)))
}

// REDUCER
export default function reducer (campuses = [], action) {
  switch (action.type) {
    case GET_ALL_CAMPUSES:
      return action.campuses
    default:
      return campuses
  }
}
