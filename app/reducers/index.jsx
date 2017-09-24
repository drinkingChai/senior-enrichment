import { combineReducers } from 'redux'
import campus from './campus'
import students from './students'

const reducer = combineReducers({
  campus,
  students
})

export default reducer
export * from './campus'
export * from './students'
