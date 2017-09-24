import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeStudentName } from '../reducers'

const StudentForm = ({ onChangeHandler }) => {  
  return (
    <form>
      <div>
        <label htmlFor='name'>Name</label>
        <input name='name' onChange={ onChangeHandler }/>
      </div>
    </form>
  )
}

const mapStateToProps = () => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeHandler(ev) {
      dispatch(writeStudentName(ev.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
