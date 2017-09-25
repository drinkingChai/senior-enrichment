import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
  writeCampusName, 
  resetCampus, 
  fetchCampus,
  updateCampus,
  deleteStudent } from '../reducers'

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
      onChangeHandler,
      onSubmitHandler,
      onStudentRemoveHandler,
      onCampusDeleteHandler } = this.props

    return (
      <form onSubmit={ onSubmitHandler }>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ campus.name } onChange={ onChangeHandler }/>
        </div>

        <div>
          <button>Save</button>
        </div>

        <div>
          { campus.students.map(student=> (
              <div key={ student.id }>
                <Link key={ student.id } to={ `/students/${student.id}` }>{ student.name }</Link>
                <button value={ student.id } onClick={ onStudentRemoveHandler }>Delete</button>
              </div>
            ))
          }
        </div>
      </form>
    )

  }
}

const mapStateToProps = ({ campus }) => {
  return { campus }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeHandler(ev) {
      dispatch(writeCampusName(ev.target.value))
    },
    onSubmitHandler(ev) {
      ev.preventDefault()
      dispatch(updateCampus())
    },
    onStudentRemoveHandler(ev) {
      ev.preventDefault()
      dispatch(deleteStudent(ev.target.value))
        .then(()=> dispatch(fetchCampus(ownProps.match.params.id)))
    },
    onCampusDeleteHandler(ev) {
    },
    getCampus() {
      const { id } = ownProps.match.params
      if (id) dispatch(fetchCampus(id)) 
    },
    resetForm() {
      dispatch(resetCampus())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm)
