import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeStudentName, setStudentCampus, resetStudent, fetchStudent } from '../reducers'

class StudentForm extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getStudent(id)
  }

  componentWillUnmount() {
    this.props.resetForm()
  }

  render() {
    const { student, onChangeHandler } = this.props

    return (
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ student.name } onChange={ onChangeHandler }/>
        </div>
      </form>
    )

  }
}

const mapStateToProps = ({ student }) => {
  return { student }
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
      dispatch(resetStudent())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
