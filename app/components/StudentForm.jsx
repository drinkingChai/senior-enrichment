import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { writeStudent, getStudent } from '../reducers'

class StudentForm extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    id ? this.props.loadStudent(id) : store.dispatch(writeStudent(''))
  }

  render() {
    const { studentName, onChangeHandler } = this.props

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

const mapStateToProps = ({ students, studentName }, ownProps) => {
  return { students, studentName, ownProps }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeHandler(ev) {
      dispatch(writeStudent(ev.target.value))
    },
    loadStudent: (id)=> dispatch(getStudent(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
