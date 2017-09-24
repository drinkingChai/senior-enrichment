import axios from 'axios'

// ACTION NAMES

const GET_CAMPUSES_FROM_SERVER = 'GET_CAMPUSES_FROM_SERVER'

// ACTION CREATORS
const getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES_FROM_SERVER,
    campuses
  }
}

// THUNK
export const fetchCampuses = () => dispatch => {
  axios.get('/api/campuses')
    .then(response=> response.data)
    .then(campuses=> dispatch(getCampuses(campuses)))
}

// REDUCERS
export default function reducer (campuses = [], action) {
  switch (action.type) {
    case GET_CAMPUSES_FROM_SERVER:
      return action.campuses
    default:
      return campuses
  }
}
