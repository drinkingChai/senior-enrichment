import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  writeStudentName,
  setStudentCampus,
  updateStudent, 
  resetStudent, 
  fetchStudent } from '../reducers'

class StudentForm extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getStudent(id)
  }

  componentWillUnmount() {
    this.props.resetForm()
  }

  render() {
    const { 
      student,
      campuses, 
      onChangeHandler, 
      onSubmitHandler } = this.props

    const { name, campusId, id } = this.props.student

    return (
      <form onSubmit={ onSubmitHandler }>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ name } onChange={ onChangeHandler }/>
        </div>

        <div>
          <select name='campusId' value={ campusId || 0 } onChange={ onChangeHandler }>
            <option>--- none ---</option>
            { campuses.map(campus=> <option key={ campus.id } value={ campus.id }>{ campus.name }</option>) }  
          </select>
        </div>

        <div>
          <button>Save</button>
        </div>
      </form>
    )

  }
}

const mapStateToProps = ({ student, campuses }) => {
  return { student, campuses }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeHandler(ev) {
      const { name, value } = ev.target
      switch (name) {
        case 'name':
          return dispatch(writeStudentName(value))
        case 'campusId':
          return dispatch(setStudentCampus(value))
      }
    },
    onSubmitHandler(ev) {
      ev.preventDefault()
      const { history } = ownProps
      dispatch(updateStudent(history))
    },
    getStudent(id) {
      dispatch(fetchStudent(id))
    },
    resetForm() {
      dispatch(resetStudent())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
