import axios from 'axios'

// ACTION NAMES

const GET_CAMPUS_FROM_SERVER = 'GET_CAMPUS_FROM_SERVER'


// ACTION CREATORS
const getCampus = (campus) => {
  return {
    type: GET_CAMPUS_FROM_SERVER,
    campus
  }
}




// THUNK
export const fetchCampus = () => dispatch => {
  axios.get('/api/campus')
    .then(response=> response.data)
    .then(campus=> dispatch(getCampus(campus)))
}





// REDUCERS
export default function reducer (campus = [], action) {
  switch (action.type) {
    case GET_CAMPUS_FROM_SERVER:
      return action.campus
    default:
      return campus
  }
}
