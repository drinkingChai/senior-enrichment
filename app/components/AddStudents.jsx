import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStudents, addStudentCampus } from '../reducers'

class AddStudents extends Component {
  constructor() {
    super()
    this.state = { studensToAdd: [] }
    this.toggleSelect = this.toggleSelect.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    this.props.getFromServer()
  }

  toggleSelect(student) {
    const { studensToAdd } = this.state

    if (!studensToAdd.includes(student)) this.setState({ studensToAdd: [ ...studensToAdd, student ] })
    else this.setState({ studensToAdd: studensToAdd.filter(s=> s.id != student.id) })
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    this.props.addStudentsToCampus(this.state.studensToAdd)
      .then(()=> this.props.getFromServer())
  }

  render() {
    const { students, addCampusToStudents } = this.props
    const { studensToAdd } = this.state
    const { toggleSelect, onSubmitHandler } = this
    const studentsWithoutCampus = students.filter(student=> !student.campusId)

    return (
      <div>
        <h3>Add student</h3>

        <form onSubmit={ onSubmitHandler }>
          { studentsWithoutCampus.map(student=> (
            <div onClick={ ()=> toggleSelect(student) } key={ student.id }>
              { student.name }
              { studensToAdd.includes(student) ? <span>Selected</span> : null }
            </div>
          ))}
          <button>Add</button>
        </form>
      </div>
    )
  }
}

const mapState = ({ students }, ownProps) => {
  return { students, ownProps }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getFromServer: () => dispatch(fetchStudents()),
    addStudentsToCampus: (students) => {
      const { id } = ownProps.match.params
      return Promise.all(
        students.map(student => dispatch(addStudentCampus(student, id)))
      )
    }
  }
}

export default connect(mapState, mapDispatch)(AddStudents)
