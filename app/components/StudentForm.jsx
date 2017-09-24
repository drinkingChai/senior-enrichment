import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeStudentName, setStudentCampus, fetchStudent } from '../reducers'

class StudentForm extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    id ? this.props.getStudent(id) : this.props.resetForm()
  }

  render() {
    const { studentName, studentCampus, onChangeHandler } = this.props
    return (
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ studentName } onChange={ onChangeHandler }/>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ studentName, studentCampus }) => {
  return { studentName, studentCampus }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeHandler(ev) {
      dispatch(writeStudentName(ev.target.value))
    },
    getStudent(id) {
      dispatch(fetchStudent(id))
    },
    resetForm() {
      dispatch(writeStudentName(''))
      dispatch(setStudentCampus(0))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
