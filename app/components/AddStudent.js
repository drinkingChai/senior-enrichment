import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { writeStudentName, setStudentCampus, createNewStudent } from '../reducers'

class AddStudent extends Component {
  constructor() {
    super()
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }
  
  onChangeHandler(ev) {
    ev.preventDefault()
    switch (ev.target.name) {
      case 'name':
        return this.props.writeName(ev.target.value)
      case 'channelId':
        return this.props.setCampus(ev.target.value)
      default:
    }
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    const { studentNameEntry, studentCampusId } = this.props.state

    store.dispatch(createNewStudent(studentNameEntry, studentCampusId))
  }

  render() {
    const { campus, studentNameEntry, studentCampusId } = this.props.state
    const { onChangeHandler, onSubmitHandler } = this
    
    return (
      <form onSubmit={ onSubmitHandler }>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ studentNameEntry } onChange={ onChangeHandler }/>
        </div>

        <select name='channelId' value={ studentCampusId } onChange={ onChangeHandler }>
          <option>--- none ---</option>
          { campus.map(camp=> <option key={ camp.id } value={ camp.id }>{ camp.name }</option>) }
        </select>

        <button>Add!</button>
      </form>
    )
  }
}

const mapStateToProps = (state)=> {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    writeName: (name)=> dispatch(writeStudentName(name)),
    setCampus: (campusId)=> dispatch(setStudentCampus(campusId)),
    createStudent: (name, campusId)=> dispatch(createNewStudent(name, campusId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent)
