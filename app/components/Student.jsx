import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchStudent,
  fetchCampuses,
  createStudentOnServer,
  updateStudentOnServer,
  resetStudent } from '../reducers'
import formatAxiosError from './formatAxiosError'
import ErrorMessage from './ErrorMessage'
import StatusMessage from './StatusMessage'

class Student extends Component {
  constructor() {
    super()
    this.state = { student: { name: '', email: '', campus: { }, campusId: 0 }, error: '', update: '' }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.ownProps.match.params
    const { fetchStudentById, getCampuses } = this.props
    const { student } = this.state

    if (id) fetchStudentById(id).then(action=> this.setState({ ...student, student: action.student }))
    getCampuses()
  }

  componentWillUnmount() {
    this.props.reset()
  }

  onChangeHandler(ev) {
    let { name, value } = ev.target
    const { student } = this.state
    value = name == 'campusId' ? value * 1 ? value : null : value
    student[name] = value
    this.setState(student)
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    const { update, create } = this.props
    const { student } = this.state
    if (student.id) {
      update(student)
        .then(()=> {
          this.setState({ update: 'Updated...', error: '' })
          setTimeout(()=> { this.setState({ update: '' }) }, 2000)
        })
        .catch(err=> this.setState({ error: formatAxiosError(err) }))
    } else {
      create(student)
        .catch(err=> this.setState({ error: formatAxiosError(err) }))
    }
  }

  render() {
    const { student, error, update } = this.state
    const { campuses } = this.props
    const {
      onChangeHandler,
      onSubmitHandler } = this

    return (
      <div className="row">
        <div className="col-offset-2 col-8 col-md-offset-2 col-md-8">
          <div className="card campus">
            <form onSubmit={ onSubmitHandler }>
              { error.length ? 
                <ErrorMessage message={ error }/> : null }
              <div>
                <input name='name' value={ student.name } onChange={ onChangeHandler } placeholder='Name...'/>
              </div>

              <div>
                <input name='email' value={ student.email } onChange={ onChangeHandler } type='email' placeholder='E-mail...'/>
              </div>


              {/* separate this */}
              <select name='campusId' value={ student.campusId || 0 } onChange={ onChangeHandler }>
                <option value={ 0 }> --- none --- </option>
                { campuses.map(campus=> (
                  <option key={ campus.id } value={ campus.id }>{ campus.name }</option>
                ))}
              </select>

              <div>
              { update.length ? 
                <StatusMessage message={ update }/> : <button>{ student.id ? 'Update' : 'Create' }</button> }
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({ student, campuses }, ownProps) => {
  return { student, campuses, ownProps }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchStudentById: id => dispatch(fetchStudent(id)),
    getCampuses: () => dispatch(fetchCampuses()),
    create: student => dispatch(createStudentOnServer(student, ownProps.history)),
    update: student => dispatch(updateStudentOnServer(student)),
    reset: () => dispatch(resetStudent())
  }
}

export default connect(mapState, mapDispatch)(Student)
