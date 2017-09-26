import axios from 'axios'

// ACTION NAMES
const REMOVE_STUDENT_CAMPUS = 'REMOVE_STUDENT_CAMPUS'

// ACTION CREATORS
const removeCampus = () => {
  return {
    type: REMOVE_STUDENT_CAMPUS,
  }
}

// THUNK
export const removeStudentCampus = student => dispatch => {
  return axios.put(`/api/students/${student.id}`, { ...student, campusId: null })
    .then(response=> response.data)
    .then(student=> dispatch(removeCampus()))
}

// REDUCER
export default function reducer (student = {}, action) {
  switch (action.type) {
    case REMOVE_STUDENT_CAMPUS:
      return { ...student, campus: {}, campusId: null }
    default:
      return student
  }
}
