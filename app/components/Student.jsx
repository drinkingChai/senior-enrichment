import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchStudent,
  fetchCampuses,
  createStudentOnServer,
  updateStudentOnServer,
  resetStudent } from '../reducers'

class Student extends Component {
  constructor() {
    super()
    this.state = { student: { name: '', campus: { }, campusId: 0 } }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.ownProps.match.params
    const { fetchStudentById, getCampuses } = this.props

    fetchStudentById(id).then(action=> this.setState({ student: action.student }))
    getCampuses()
  }

  componentWillUnmount() {
    this.props.reset()
  }

  onChangeHandler(ev) {
    let { name, value } = ev.target
    const { student } = this.state
    value = name == 'campusId' && value * 1 ? value : null
    student[name] = value
    this.setState(student)
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    const { update, create } = this.props
    const { student } = this.state
    student.id ? update(student) : create(student)
  }

  render() {
    const { student } = this.state
    const { campuses } = this.props
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

          {/* separate this */}
          <select name='campusId' value={ student.campusId || 0 } onChange={ onChangeHandler }>
            <option value={ 0 }> --- none --- </option>
            { campuses.map(campus=> (
              <option key={ campus.id } value={ campus.id }>{ campus.name }</option>
            ))}
          </select>

          <button>{ student.id ? 'Update' : 'Create' }</button>
        </form>
      </div>
    )
  }
}

const mapState = ({ student, campuses }, ownProps) => {
  return { student, campuses, ownProps }
}

const mapDispatch = dispatch => {
  return {
    fetchStudentById: id => dispatch(fetchStudent(id)),
    getCampuses: () => dispatch(fetchCampuses()),
    writeName: name => dispatch(writeStudentName(name)),
    //create: campus => dispatch(createCampusOnServer(campus)),
    update: student => dispatch(updateStudentOnServer(student)),
    reset: () => dispatch(resetStudent())
  }
}

export default connect(mapState, mapDispatch)(Student)
