import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStudents } from '../reducers'

class AllStudents extends Component {
  componentDidMount() {
    this.props.getFromServer()
  }

  render() {
    const { students } = this.props

    return (
      <div>
        <h3>Students</h3>

        <div>
          { students.map(student=> (
            <div key={ student.id }>
              <Link to={ `/students/${student.id}` }>{ student.name }</Link>
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
    getFromServer: () => dispatch(fetchStudents())
  }
}

export default connect(mapState, mapDispatch)(AllStudents)
