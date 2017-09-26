import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchCampus,
  createCampusOnServer,
  updateCampusOnServer,
  resetCampus,
  removeStudentCampus } from '../reducers'

class Campus extends Component {
  constructor() {
    super()
    this.state = { campus: { name: '', students: [] } }
    this.onRemoveStudentHandler = this.onRemoveStudentHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.ownProps.match.params
    const { fetchById } = this.props

    fetchById(id).then(action=> this.setState({ campus: action.campus }))
  }

  componentWillUnmount() {
    this.props.reset()
  }

  onChangeHandler(ev) {
    const { campus } = this.state
    this.setState({ campus: { ...campus, name: ev.target.value }})
  }

  onRemoveStudentHandler(ev) {
    const { campus } = this.state
    const studentId = ev.target.value * 1
    const student = campus.students.find(s=> s.id == studentId)
    this.props.removeFromCampus(student)
      .then(()=> {
        this.setState({ campus: { ...campus, students: campus.students.filter(s=> s.id != studentId) } })
      })
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    const { update, create } = this.props
    const { campus } = this.state
    campus.id ? update(campus) : create(campus)
  }

  render() {
    const { campus } = this.state
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
    removeFromCampus: student => dispatch(removeStudentCampus(student)),
    reset: () => dispatch(resetCampus())
  }
}

export default connect(mapState, mapDispatch)(Campus)
