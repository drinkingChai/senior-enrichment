import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStudents, removeStudent } from '../reducers'

class AllStudents extends Component {
  constructor() {
    super()
    this.onDeleteStudentHandler = this.onDeleteStudentHandler.bind(this)
  }

  componentDidMount() {
    this.props.getFromServer()
  }

  onDeleteStudentHandler(ev) {
    this.props.deleteStudent(ev.target.value)
  }

  render() {
    const { students } = this.props
    const { onDeleteStudentHandler } = this

    return (
      <div>
        <h3>Students</h3>

        <div>
          { students.map(student=> (
            <div key={ student.id }>
              <Link to={ `/students/${student.id}` }>{ student.name }</Link>
              <button value={ student.id } onClick={ onDeleteStudentHandler }>Delete</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = ({ students }) => {
  return { students }
}

const mapDispatch = dispatch => {
  return {
    getFromServer: () => dispatch(fetchStudents()),
    deleteStudent: id => dispatch(removeStudent(id))
  }
}

export default connect(mapState, mapDispatch)(AllStudents)
