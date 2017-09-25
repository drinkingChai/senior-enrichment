import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
  writeCampusName, 
  resetCampus, 
  resetStudent,
  fetchCampus,
  fetchStudent,
  setStudentCampus,
  updateCampus,
  updateStudent,
  deleteStudent,
  deleteCampus } from '../reducers'

class CampusForm extends Component {
  componentDidMount() {
    this.props.getCampus()
  }

  componentWillUnmount() {
    this.props.resetForm()
  }

  render() {
    const { 
      campus, 
      student,
      students,
      onChangeHandler,
      onSubmitHandler,
      onStudentRemoveHandler,
      onStudentDeleteHandler,
      onStudentAddHandler,
      onCampusDeleteHandler } = this.props

    return (
      <form onSubmit={ onSubmitHandler }>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ campus.name } onChange={ onChangeHandler }/>
        </div>

        <div>
          <button>Save</button>
          { campus.id ? <button onClick={ onCampusDeleteHandler }>Delete</button> : null }
        </div>

        <div>
          { campus.students.map(student=> (
              <div key={ student.id }>
                <Link key={ student.id } to={ `/students/${student.id}` }>{ student.name }</Link>
                <button value={ student.id } onClick={ onStudentDeleteHandler }>Delete</button>
                <button value={ student.id } onClick={ onStudentRemoveHandler }>Remove</button>
              </div>
            ))
          }
        </div>

        <div>
          <select name='student' onChange={ onChangeHandler }>
            <option>--- add a student ---</option>
          { students.filter(student=> !student.campusId).map(student=> (
              <option key={ student.id } value={ student.id }>{ student.name }</option>
            ))
          }
          </select>
          <button onClick={ onStudentAddHandler }>Add</button>
        </div>
      </form>
    )

  }
}

const mapStateToProps = ({ campus, student, students }) => {
  return { campus, student, students }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeHandler(ev) {
      const { name, value } = ev.target
      switch (name) {
        case 'name':
          dispatch(writeCampusName(value))
        case 'student':
          dispatch(fetchStudent(value))
            .then(()=> dispatch(setStudentCampus(ownProps.match.params.id)))
      }
    },
    onSubmitHandler(ev) {
      ev.preventDefault()
      dispatch(updateCampus())
        .then(campus=> ownProps.history.push(`/campuses/${campus.id}`))
    },
    onStudentDeleteHandler(ev) {
      ev.preventDefault()
      dispatch(deleteStudent(ev.target.value))
        .then(()=> dispatch(fetchCampus(ownProps.match.params.id)))
    },
    onStudentRemoveHandler(ev) {
      ev.preventDefault()
      dispatch(fetchStudent(ev.target.value))
        .then(()=> {
          dispatch(setStudentCampus(null))
          return dispatch(updateStudent()) 
        })
        .then(()=> dispatch(fetchCampus(ownProps.match.params.id)))
    },
    onStudentAddHandler(ev) {
      ev.preventDefault()
      dispatch(updateStudent())
        .then(()=> dispatch(fetchCampus(ownProps.match.params.id)))
    },
    onCampusDeleteHandler(ev) {
      ev.preventDefault()
      dispatch(deleteCampus(ownProps.match.params.id))
        .then(()=> ownProps.history.push('/'))
    },
    getCampus() {
      const { id } = ownProps.match.params
      if (id) dispatch(fetchCampus(id)) 
    },
    resetForm() {
      dispatch(resetCampus())
      dispatch(resetStudent())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm)
