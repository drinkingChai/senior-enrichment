import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStudents, removeStudent } from '../reducers'

class AllStudents extends Component {
  componentDidMount() {
    this.props.getFromServer()
  }

  render() {
    const { students, deleteStudent } = this.props

    return (
      <div>
        <h3>Students</h3>

        <div>
          { students.map(student=> (
            <div key={ student.id }>
              <Link to={ `/students/${student.id}` }>{ student.name }</Link>
              <button value={ student.id } onClick={ deleteStudent }>Delete</button>
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
    deleteStudent: ev => dispatch(removeStudent(ev.target.value))
  }
}

export default connect(mapState, mapDispatch)(AllStudents)
