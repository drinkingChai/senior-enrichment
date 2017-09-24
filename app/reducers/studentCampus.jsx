// ACTION NAMES

const SET_STUDENT_CAMPUS = 'SET_STUDENT_CAMPUS'

// ACTION CREATORS
export const setStudentCampus = studentCampus => {
  return {
    type: SET_STUDENT_CAMPUS,
    studentCampus
  }
}

export default function reducer (state = 0, action) {
  switch (action.type) {
    case SET_STUDENT_CAMPUS:
      return action.studentCampus
    default:
      return state 
  }
}
