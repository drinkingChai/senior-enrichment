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
    const { fetchByCampusId } = this.props

    if (id) fetchByCampusId(id).then(action=> this.setState({ campus: action.campus }))
  }

  componentWillUnmount() {
    this.props.reset()
  }

  onChangeHandler(ev) {
    const { campus } = this.state
    this.setState({ campus: { ...campus, name: ev.target.value }})
  }

  onRemoveStudentHandler(student) {
    const { campus } = this.state
    this.props.removeFromCampus(student)
      .then(()=> {
        this.setState({ campus: { ...campus, students: campus.students.filter(s=> s.id != student.id) } })
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

        <Link to={ `/campuses/${campus.id}/add-students` }>Add Student</Link>
      
        {/* separate the student list */}
        {
          campus.students.map(student=> (
            <div key={ student.id }>
              <h5>{ student.name }</h5>
              <button onClick={ () => onRemoveStudentHandler(student) }>Remove</button>
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchByCampusId: id => dispatch(fetchCampus(id)),
    create: campus => dispatch(createCampusOnServer(campus, ownProps.history)),
    update: campus => dispatch(updateCampusOnServer(campus)),
    removeFromCampus: student => dispatch(removeStudentCampus(student)),
    reset: () => dispatch(resetCampus())
  }
}

export default connect(mapState, mapDispatch)(Campus)
