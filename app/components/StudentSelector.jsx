// student selector concept:
// select a student without campus
// click +
// takes this campusId as a prop
// axios call to update that student
// dispatch(addStudentToCampus(studentId, campusId))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addStudentToCampus } from '../reducers'

class StudentSelector extends Component {
  constructor() {
    super()
    this.state = { studentId: 0 }
    this.onChangeStudent = this.onChangeStudent.bind(this)
    this.onClickAdd = this.onClickAdd.bind(this)
  }

  onChangeStudent(ev) {
    this.setState({ studentId: ev.target.value })
  }

  onClickAdd(ev) {
    this.props.addStudent( this.state.studentId, this.props.campusId )
  }

  render() {
    const { students, campusId } = this.props
    const { onChangeStudent, onClickAdd } = this

    return (
      <div>
        <select value={ this.state.studentId } onChange={ onChangeStudent }>
          <option>--- select student ---</option>
          { students.map(student=> (
            <option key={ student.id } value={ student.id }>{ student.name }</option>))
          }
        </select>
        <button onClick={ onClickAdd }>+</button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addStudent(studentId, campusId) {
      dispatch(addStudentToCampus(studentId, campusId))
    }
  }
}

export default connect(null, mapDispatch)(StudentSelector) 
