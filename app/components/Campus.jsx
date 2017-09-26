import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchCampus,
  writeCampusName,
  createCampusOnServer,
  updateCampusOnServer,
  resetCampus,
  removeStudentFromCampus } from '../reducers'

class Campus extends Component {
  constructor() {
    super()
    this.onRemoveStudentHandler = this.onRemoveStudentHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.ownProps.match.params
    const { fetchById } = this.props

    fetchById(id)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  onChangeHandler(ev) {
    this.props.writeName(ev.target.value)
  }

  onRemoveStudentHandler(ev) {
    this.props.removeFromCampus(this.props.campus, ev.target.value)
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    const { campus, update, create } = this.props
    campus.id ? update(campus) : create(campus)
  }

  render() {
    const { campus } = this.props
    const {
      onRemoveStudentHandler,
      onChangeHandler,
      onSubmitHandler } = this

    return (
      <div>
        <form onSubmit={ onSubmitHandler }>
          <div>
            <label htmlFor='name'>Name</label>
            <input name='name' value={ campus.name } onChange={ onChangeHandler }/>
          </div>

          <button>{ campus.id ? 'Update' : 'Create' }</button>
        </form>
      
        {/* separate the student list */}
        {
          campus.students.map(student=> (
            <div key={ student.id }>
              <h5>{ student.name }</h5>
              <button value={ student.id } onClick={ onRemoveStudentHandler }>Remove</button>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapState = ({ campus }, ownProps) => {
  return { campus, ownProps }
}

const mapDispatch = dispatch => {
  return {
    fetchById: id => dispatch(fetchCampus(id)),
    writeName: name => dispatch(writeCampusName(name)),
    create: campus => dispatch(createCampusOnServer(campus)),
    update: campus => dispatch(updateCampusOnServer(campus)),
    removeFromCampus: (campus, studentId) => dispatch(removeStudentFromCampus(campus, studentId)),
    reset: () => dispatch(resetCampus())
  }
}

export default connect(mapState, mapDispatch)(Campus)
