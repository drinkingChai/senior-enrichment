import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStudents } from '../reducers'

class AddStudents extends Component {
  constructor() {
    super()
    this.state = { studensToAdd: [] }
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
  }

  componentDidMount() {
    this.props.getFromServer()
  }

  toggleSelect(id) {
    const { studensToAdd } = this.state

    if (!studensToAdd.includes(id)) this.setState({ studensToAdd: [ ...studensToAdd, id ] })
    else this.setState({ studensToAdd: studensToAdd.filter(_id=> _id != id) })
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
  }

  render() {
    const studentsWithoutCampus = this.props.students.filter(student=> !student.campusId)
    const { studensToAdd } = this.state
    const { onSubmitHandler, toggleSelect } = this

    return (
      <div>
        <h3>Add student</h3>

        <form onSubmit={ onSubmitHandler }>
          { studentsWithoutCampus.map(student=> (
            <div onClick={ ()=> toggleSelect(student.id) } key={ student.id }>
              { student.name }
              { studensToAdd.includes(student.id) ? <span>Selected</span> : null }
            </div>
          ))}
          <button>Add</button>
        </form>
      </div>
    )
  }
}

const mapState = ({ students }) => {
  return { students }
}

const mapDispatch = dispatch => {
  return {
    getFromServer: () => dispatch(fetchStudents())
  }
}

export default connect(mapState, mapDispatch)(AddStudents)
