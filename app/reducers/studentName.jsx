import axios from 'axios'

// ACTION NAMES

const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME'

// ACTION CREATORS
export const writeStudentName = studentName => {
  return {
    type: WRITE_STUDENT_NAME,
    studentName 
  }
}

export default function reducer (state = '', action) {
  switch (action.type) {
    case WRITE_STUDENT_NAME:
      return action.studentName
    default:
      return state 
  }
}
