// ACTION NAMES

const WRITE_STUDENT = 'WRITE_STUDENT'


// ACTION CREATORS
export const writeStudent = (studentName) => {
  return {
    type: WRITE_STUDENT,
    studentName
  }
}


// REDUCERS
export default function reducer (studentName = '', action) {
  switch (action.type) {
    case WRITE_STUDENT:
      return action.studentName
    default:
      return studentName
  }
}
