import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchStudent,
  createStudentOnServer,
  updateStudentOnServer,
  resetStudent } from '../reducers'

class Student extends Component {
  constructor() {
    super()
    this.state = { student: { name: '', campus: {} } }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.ownProps.match.params
    const { fetchStudentById } = this.props

    fetchStudentById(id).then(action=> this.setState({ student: action.student }))
  }

  componentWillUnmount() {
    this.props.reset()
  }

  onChangeHandler(ev) {
    const { student } = this.state
    this.setState({ student: { ...student, name: ev.target.value }})
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    const { update, create } = this.props
    const { student } = this.state
    student.id ? update(student) : create(student)
  }

  render() {
    const { student } = this.state
    const {
      onChangeHandler,
      onSubmitHandler } = this

    return (
      <div>
        <form onSubmit={ onSubmitHandler }>
          <div>
            <label htmlFor='name'>Name</label>
            <input name='name' value={ student.name } onChange={ onChangeHandler }/>
          </div>

          <button>{ student.id ? 'Update' : 'Create' }</button>
        </form>
      </div>
    )
  }
}

const mapState = ({ student }, ownProps) => {
  return { student, ownProps }
}

const mapDispatch = dispatch => {
  return {
    fetchStudentById: id => dispatch(fetchStudent(id)),
    writeName: name => dispatch(writeStudentName(name)),
    //create: campus => dispatch(createCampusOnServer(campus)),
    update: student => dispatch(updateStudentOnServer(student)),
    reset: () => dispatch(resetStudent())
  }
}

export default connect(mapState, mapDispatch)(Student)
