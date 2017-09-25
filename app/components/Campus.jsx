import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeCampusFromStudent } from '../reducers'

class Campus extends Component {
  render() {
    const campus = this.props.campuses.find(c=> c.id == this.props.match.params.id)

    if (!campus) return <div></div>

    return (
      <div>
        <h4>{ campus.name }</h4>
        { campus.students.map(student=> (
          <div key={ student.id }>
            <li>{ student.name }</li>
            <button value={ student.id } onClick={ this.props.onRemoveHandler }>Remove</button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = ({ campuses, students }) => {
  return { campuses, students }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    onRemoveHandler(ev) {
      // pass in student id to axios
      // axios will search through students in state
      // find by id, set its campusId to null and update
      dispatch(removeCampusFromStudent(ev.target.value))
    }
  }
}

export default connect(mapState, mapDispatch)(Campus)
