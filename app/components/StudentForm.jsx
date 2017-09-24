import React from 'react'
import { connect } from 'react-redux'
import { writeStudent } from '../reducers'

const StudentForm = ({ students, studentName, onChangeHandler, ownProps }) => {
  return (
    <form>
      <div>
        <label htmlFor='name'>Name</label>
        <input name='name' value={ studentName } onChange={ onChangeHandler }/>
      </div>
    </form>
  )
}

const mapStateToProps = ({ students, studentName }, ownProps) => {
  // replace with active student
  return { students, studentName, ownProps }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeHandler(ev) {
      dispatch(writeStudent(ev.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
