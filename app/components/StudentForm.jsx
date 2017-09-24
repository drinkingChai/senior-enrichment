import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeStudentName, fetchStudent, resetState } from '../reducers'

class StudentForm extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    id ? this.props.getStudent(id) : this.props.resetForm()
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
      dispatch(resetState())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
