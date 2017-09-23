import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import store from '../store'
import { writeStudentName, setStudentCampus, createNewStudent, updateStudent } from '../reducers'

class AddStudent extends Component {
  constructor() {
    super()
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onUpdateHandler = this.onUpdateHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    if (!this.props.match.params.id) return
    
    axios.get(`/api/students/${this.props.match.params.id}`)
      .then(response=> response.data)
      .then(student=> {
        this.props.writeName(student.name)
        this.props.setCampus(student.campusId)
      })
  }

  componentWillUnmount() {
    this.props.writeName('')
    this.props.setCampus(0)
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
    this.props.create(studentNameEntry, studentCampusId)
  }

  onUpdateHandler(ev) {
    ev.preventDefault()
    const studentId = this.props.match.params.id
    const { studentNameEntry, studentCampusId } = this.props.state
    this.props.update(studentId, { name: studentNameEntry, campusId: studentCampusId })
  }

  render() {
    const { campus, studentNameEntry, studentCampusId } = this.props.state
    const { onChangeHandler, onSubmitHandler, onUpdateHandler } = this
    const studentId = this.props.match.params.id
    
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

        { studentId ? <button onClick={ onUpdateHandler }>Update</button> : <button>Add!</button> }
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
    create: (name, campusId)=> dispatch(createNewStudent(name, campusId)),
    update: (studentId, info)=> dispatch(updateStudent(studentId, info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent)
