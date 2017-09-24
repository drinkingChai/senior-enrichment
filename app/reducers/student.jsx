import axios from 'axios'

// ACTION NAMES

const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME'

// ACTION CREATORS
export const writeStudentName = name => {
  return {
    type: WRITE_STUDENT_NAME,
    name
  }
}

// THUNK

// REDUCERS
const initialState = {
  name: '',
  campusId: null
}

export default function reducer (student = initialState, action) {
  switch (action.type) {
    case WRITE_STUDENT_NAME:
      return { ...student, name: action.name }
    default:
      return student 
  }
}
