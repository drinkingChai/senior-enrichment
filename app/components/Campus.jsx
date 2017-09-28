import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchCampus,
  createCampusOnServer,
  updateCampusOnServer,
  resetCampus,
  removeStudentCampus } from '../reducers'
import formatAxiosError from './formatAxiosError'
import ErrorMessage from './ErrorMessage'
import StatusMessage from './StatusMessage'

class Campus extends Component {
  constructor() {
    super()
    this.state = { campus: { name: '', address: '', students: [] }, error: '', update: '' }
    this.onRemoveStudentHandler = this.onRemoveStudentHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.ownProps.match.params
    const { fetchByCampusId } = this.props
    const { campus } = this.state

    if (id) fetchByCampusId(id).then(action=> this.setState({ ...campus, campus: action.campus }))
  }

  componentWillUnmount() {
    this.props.reset()
  }

  onChangeHandler(ev) {
    const { campus } = this.state
    const { name, value } = ev.target
    campus[name] = value
    this.setState({ campus })
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
    if (campus.id) {
      update(campus)
        .then(()=> {
          this.setState({ update: 'Updated...' })
          setTimeout(()=> { this.setState({ update: '' }) }, 2000)
        })
        .catch(err=> this.setState({ error: formatAxiosError(err) }))
    } else {
      create(campus)
        .catch(err=> this.setState({ error: formatAxiosError(err) }))
    }
  }

  render() {
    const { campus, error, update } = this.state
    const {
      onRemoveStudentHandler,
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
                <input name='name' value={ campus.name } onChange={ onChangeHandler } placeholder="Name..."/>
              </div>

              <div>
                <input name='address' value={ campus.address } onChange={ onChangeHandler } placeholder="Address..."/>
              </div>

              <button>{ campus.id ? 'Update' : 'Create' }</button>

              { update.length ? 
                <StatusMessage message={ update }/> : null }
            </form>
          
            {/* separate the student list */}
            <div className="col-12">
              {
                campus.students.map(student=> (
                  <div key={ student.id } className="col-12 list-item-container">
                    <div className="list-item">
                      <h5><Link to={ `/students/${student.id}` }>{ student.name }</Link></h5>
                      <button onClick={ () => onRemoveStudentHandler(student) }>Remove</button>
                    </div>
                  </div>
                ))
              }

              {
                campus.id ?
                <div className="col-12 col-md-12 col-sm-12">
                  <Link className="col-12 card card-blue btn" to={ `/campuses/${campus.id}/add-students` }>Add student</Link>
                </div> :
                null
              }
            </div>
          </div>
        </div>
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
