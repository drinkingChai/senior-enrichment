import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { writeStudentName, setStudentCampus, updateStudent, resetStudent, fetchStudent } from '../reducers'

class StudentForm extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getStudent(id)
  }

  componentWillUnmount() {
    this.props.resetForm()
  }

  render() {
    const { student, campuses, onChangeHandler } = this.props

    return (
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ student.name } onChange={ onChangeHandler }/>
        </div>

        <div>
          <Link to={ `/campuses/${student.campus.id}` }>{ student.campus.name }</Link>
        </div>

        <div>
          <select name='campusId' value={ student.campusId } onChange={ onChangeHandler }>
            { campuses.map(campus=> <option key={ campus.id } value={ campus.id }>{ campus.name }</option>) }  
          </select>
        </div>
      </form>
    )

  }
}

const mapStateToProps = ({ student, campuses }) => {
  return { student, campuses }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeHandler(ev) {
      const { name, value } = ev.target
      // replace with an updateStudent
      // unsure if this is great!
      //dispatch(updateStudent({ name, value }))
      // possibly dangerous
      switch (name) {
        case 'name':
          return dispatch(writeStudentName(value))
        case 'campusId':
          return dispatch(setStudentCampus(value))
      }
    },
    getStudent(id) {
      dispatch(fetchStudent(id))
    },
    resetForm() {
      dispatch(resetStudent())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
