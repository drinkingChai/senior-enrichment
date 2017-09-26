import React from 'react'
import { connect } from 'react-redux'
import {
  removeStudent } from '../reducers'

const Student = (props) => {
  return (
    <div></div>
  )
}

const mapDispatch = dispatch => {
  return {
    deleteStudent: id => dispatch(removeStudent(id)),
  }
}

export default connect(null, mapDispatch)(Student)
